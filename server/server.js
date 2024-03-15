const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const cron = require("node-cron");

require('dotenv').config()
const { sendTextMessage } = require('./smsSender');
const app = express();
const port = 8000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Businfo=require('./model/businfo')

// Connect to MongoDB 
mongoose.connect('mongodb+srv://karanm17ab:karanm2004@trainingproject.77ipet4.mongodb.net/Kec-VMS?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
  });
})
.catch(error => {
  console.log("Error connecting to MongoDB:", error);
});


// Dummy user data for demonstration
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Login route
app.post('/login', (req, res) => {
  console.log("API Working")
  const { username, password } = req.body;
  
  // Find user by username and password
  const user = users.find((user) => user.username === username && user.password === password);
  
  if (user) {
    return res.status(200).json({ message: 'Login successful'});
  } else {
    return res.status(500).json({ message: 'Invalid username or password' });
  }
});

// Fetching businfo
app.get('/businfo', async (req, res) => {
  console.log("Finding all bus info...");
  try {
    const entries = await Businfo.find();
    res.status(200).json(entries);
    }
   catch (error) {
    console.error('Error fetching bus info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Adding new data
app.post('/addData', async (req, res) => {
  try {
    const newData = req.body;
    await Businfo.create(newData);
    res.status(201).json({ message: 'New data added successfully' });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});


//delete id
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Deleting document with ID:", id); 
  try {
    const deletedDocument = await Businfo.deleteOne({_id: id});
    if (deletedDocument) {
      res.status(200).json({ message: "Expense Deleted" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Server error!" });
  }
});




app.get('/notification', async (req, res) => {
  try {
    const currentDate = new Date();
    const nearingEntries = await Businfo.find({
      next_service: {
        $gte: currentDate,
        $lte: new Date(currentDate.getTime() + (5 * 24 * 60 * 60 * 1000))
      }
    });

    console.log(nearingEntries);

    if (nearingEntries.length > 0) {
      await Promise.all(nearingEntries.map(async (entry) => {
        await sendTextMessage('+919080710235', `Your vehicle ${entry.vehicle_number} is due for service soon.`);
      }));
    }

    res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

cron.schedule('0 9 * * *', async () => {
  try {
    console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
    console.log('Notification called!');
    
    const date = new Date();
    console.log(date);
    
    const data = await Businfo.find({
      next_service: {
        $gte: date,
        $lte: new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000)) // Next service due within 5 days
      }
    });

    if (data.length > 0) {
      const servingData = data.map(element => {
        const message = `Hello ${element.driver_name}. We hope you are doing well. Here is your reminder for service. Your next service is due soon ${element.next_service}. Thank you.`;
        return { message: message };
      });

      await Promise.all(
        servingData.map(data => {
          return sendTextMessage('+919080710235', data.message);
        })
      );

      console.log("Messages Sent");
    } else {
      console.log("No upcoming services within 5 days.");
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata" // Set timezone to Asia/Kolkata (IST)
});







module.exports = app;
