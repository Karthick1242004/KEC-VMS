import React, { useState, useEffect } from 'react';
import axios from 'axios';
import To from './Table.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
function Tableadmin() {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    driverName: '',
    vehicleNumber: '',
    vehicleType: '',
    vehicleDepartment: ''
  });

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://kec-vms.onrender.com/businfo')
      .then(response => {
        if (Array.isArray(response.data)) {
          setTableData(response.data);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleDeleteRow = async(id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this row?');
    console.log(id)
    if (shouldDelete) {
      const res= await axios.delete(`https://kec-vms.onrender.com/delete/${id}`)
      .then((res)=> {
        toast.success('deleted successfully');
         fetchData();})
      .catch(()=>{
        toast.error("Failed to delete")
      })
     
    }
  };

  const handleAddRow = () => {
    const newData = [...tableData];
    newData.push({
      id: newData.length + 1,
      driver_name: '',
      vehicle_number: '',
      vehicle_company: '',
      engine_type: '',
      department: '',
      last_service: '',
      next_service: ''
    });
    setTableData(newData);
  };

  const filteredData = tableData.filter((data) => {
    return (
      data.driver_name.toLowerCase().includes(filters.driverName.toLowerCase()) &&
      data.vehicle_number.toLowerCase().includes(filters.vehicleNumber.toLowerCase()) &&
      data.engine_type.toLowerCase().includes(filters.vehicleType.toLowerCase()) &&
      data.department.toLowerCase().includes(filters.vehicleDepartment.toLowerCase())
    );
  });

  return (
    <div>
      <ToastContainer />
      <div className={To.main1}>
        <input
          type='search'
          className={To.search}
          placeholder='Search Driver Name....'
          value={filters.driverName}
          onChange={(e) => handleFilterChange('driverName', e.target.value)}
        />
        <input
          type='search'
          className={To.search}
          placeholder='Search Vehicle Number....'
          value={filters.vehicleNumber}
          onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)}
        />
        <input
          type='search'
          className={To.search}
          placeholder='Search Vehicle Type....'
          value={filters.vehicleType}
          onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
        />
        <input
          type='search'
          className={To.search}
          placeholder='Search Vehicle Department....'
          value={filters.vehicleDepartment}
          onChange={(e) => handleFilterChange('vehicleDepartment', e.target.value)}
        />
      </div>
      <table className={To.table}>
        <thead>
        <tr>
             <th>ID</th>
             <th>Driver Name</th>
             <th>Vehicle Number</th>
             <th>Vehicle Company</th>
             <th>Engine Type</th>
             <th>Department</th>
             <th>Last Service</th>
             <th>Next Service</th>
             <th>Delete Values</th>
           </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td className={To.column}>{data.id}</td>
              <td className={To.column}>{data.driver_name}</td>
              <td className={To.column}>{data.vehicle_number}</td>
              <td className={To.column}>{data.vehicle_company}</td>
              <td className={To.column}>{data.engine_type}</td>
              <td className={To.column}>{data.department}</td>
              <td className={To.column}>{dateFormat(data.last_service)}</td>
              <td className={To.column}>{dateFormat(data.next_service)}</td>
              <td className={To.column}>
                <div className={To.icons1}>
                 <button onClick={() => handleDeleteRow(data._id)} >Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tableadmin;
