import React from 'react';
import Do from './Dash.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Tableadmin from './components/Tableadmin';
import Addinfo from './components/Addinfo';

function Dash() {
  return (
    <div>
      <div className={Do.main}>
        <div className={Do.side}>
          <h1>Admin <span>Panel</span></h1>
          <div className={Do.main12}>
          <div className={Do.lk1}>
             <FontAwesomeIcon icon={faHouse} className={Do.icn2}/>
             <Link to="/" className={Do.lk}>Home</Link>
          </div>
          <div className={Do.lk1}>
             <FontAwesomeIcon icon={faCar} className={Do.icn2}/>
             <Link className={Do.lk} to='#'>Vehicle Details</Link>
          </div>
          <div className={Do.lk1}>
             <FontAwesomeIcon icon={faSquarePlus} className={Do.icn2}/>
             <Link className={Do.lk} to='/Addinfo'>Add New Vehicles</Link>
          </div>
          <div className={Do.lk1}>
             <FontAwesomeIcon icon={faRegistered} className={Do.icn2}/>
             <Link className={Do.lk} to='#'>Vehicle Registration</Link>
          </div>
          <div className={Do.lk1}>
             <FontAwesomeIcon icon={faPhone} className={Do.icn2}/>
             <Link className={Do.lk} to='#'>Contact Us</Link>
          </div>
          </div>
        </div>
        <div className={Do.main1}>
           <div className={Do.nave}>
            <div className={Do.nave1}>
              <h1>Vehicle Managment</h1>
              <p>Manage Vehicle</p>
            </div>
            <div className={Do.nave2}>
              <p>College - <span1>Vehicle Management</span1></p>
            </div>
           </div>
           <div className={Do.tb}>
            <Tableadmin/>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Dash