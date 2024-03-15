const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.Auth_Token;
const twilioClient = new twilio(accountSid, authToken);

// Function to send text message
const sendTextMessage = async (recipient, message) => {
    try {
        // Send the text message
        await twilioClient.messages.create({
            body: message,
            to: recipient,
            from: '+13213042534' // Replace with your Twilio phone number
        });

        console.log(`Text message sent to ${recipient}: ${message}`);
    } catch (error) {
        console.error('Error sending text message:', error);
    }
};

module.exports = { sendTextMessage };
