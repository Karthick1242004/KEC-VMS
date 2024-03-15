import React, { useState } from 'react';
import axios from 'axios';
import Si from './Addinfo.module.css'; 
import { ToastContainer ,toast} from 'react-toastify';
 
const Addinfo = () => {
  const [formData, setFormData] = useState({
    id: '',
    driver_name: '',
    vehicle_number: '',
    vehicle_company: '',
    engine_type: '',
    department: '',
    last_service: '',
    next_service: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/addData', formData)
      .then(response => {
        toast.success("Added Successfully")
        console.log('Data added successfully:', response);
        // Optionally, reset the form fields
        setFormData({
          id: '',
          driver_name: '',
          vehicle_number: '',
          vehicle_company: '',
          engine_type: '',
          department: '',
          last_service: '',
          next_service: ''
        });
      })
      .catch(error => {
        toast.error("Failed to add data")
        console.error('Error adding data:', error);
      });
  };
  
  return (
    <div className={Si.outerform}>
      <ToastContainer/>
      <form className={Si.form} onSubmit={handleSubmit}>
        <div className={Si.header}>
          <p className={Si.title}>Add Data</p>
          {/* No description for this form */}
        </div>
        <div className={Si['flex-column']}>
          <label>ID</label>
        </div>
        <div className={Si.inputForm}>
          <input type='text' className={Si.input} placeholder="Enter ID" name="id" value={formData.id} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Driver Name</label>
        </div>
        <div className={Si.inputForm}>
          <input type="text" className={Si.input} placeholder="Enter Driver Name" name="driver_name" value={formData.driver_name} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Vehicle Number</label>
        </div>
        <div className={Si.inputForm}>
          <input type="text" className={Si.input} placeholder="Enter Vehicle Number" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Vehicle Company</label>
        </div>
        <div className={Si.inputForm}>
          <input type="text" className={Si.input} placeholder="Enter Vehicle Company" name="vehicle_company" value={formData.vehicle_company} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Engine Type</label>
        </div>
        <div className={Si.inputForm}>
          <input type="text" className={Si.input} placeholder="Enter Engine Type" name="engine_type" value={formData.engine_type} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Department</label>
        </div>
        <div className={Si.inputForm}>
          <input type="text" className={Si.input} placeholder="Enter Department" name="department" value={formData.department} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Last Service Date</label>
        </div>
        <div className={Si.inputForm}>
          <input type="date" className={Si.input} placeholder="Enter Last Service Date" name="last_service" value={formData.last_service} onChange={handleChange} />
        </div>

        <div className={Si['flex-column']}>
          <label>Next Service Date</label>
        </div>
        <div className={Si.inputForm}>
        <input type="date" className={Si.input} placeholder="Enter Next Service Date" name="next_service" value={formData.next_service} onChange={handleChange} />
        </div>

        {/* Repeat the above pattern for other fields */}

        <button className={Si['button-submit']} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Addinfo;
