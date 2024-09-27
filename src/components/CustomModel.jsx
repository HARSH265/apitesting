import React from 'react';
import "../customcss/customModel.css";
import { useSelector } from 'react-redux';
const CustomModel = ({ id,showPopUp, setShowPopup }) => {
    const allUsers=useSelector((state)=>state.app.users);
    const singleUser=allUsers.filter((user)=>user.id===id)
    
    if (singleUser.length ===0) return <div>No UserFound.</div>
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick={() => setShowPopup(false)}>Close</button>
                <h2>{singleUser[0].name}</h2>
                <h3>{singleUser[0].email}</h3>
                <h4>{singleUser[0].age}</h4>
                <p>{singleUser[0].gender}</p>
            </div>
        </div>
    );
};

export default CustomModel;
