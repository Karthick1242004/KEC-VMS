import React, { useState, useEffect } from 'react';
import axios from 'axios';
import To from './Table.module.css'; // Importing CSS module
import moment from 'moment'
function Table() {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    driverName: '',
    vehicleNumber: '',
    vehicleType: '',
    vehicleDepartment: ''
  });

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:8000/businfo')
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
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

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
          </tr>
        </thead>
        <tbody>
          {/* Map over the filteredData array to generate table rows */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
