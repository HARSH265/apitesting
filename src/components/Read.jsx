import React, { useEffect, useState } from 'react';
import CustomModel from './CustomModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, showUser } from '../features/UserDetailsSlice';
import { Link } from 'react-router-dom';

const Read = () => {
  const [id, setId] = useState(null);
  const [showPopUp, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const { users, loading, error, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());  
  }, [dispatch]);

 
  const searchQuery = searchData || '';

 
  const filteredUsers = users.filter((user) =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))   
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {showPopUp && <CustomModel id={id} showPopUp={showPopUp} setShowPopup={setShowPopup} />}
      <h1>All Users</h1>
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="card w-50 mx-auto my-4">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">Gender: {user.gender}</p>
                <button className="card-link" onClick={() => [setId(user.id), setShowPopup(true)]}>View</button>
                <Link to={`/edit/${user.id}`} className="card-link">Edit</Link>
                <Link onClick={() => dispatch(deleteUser(user.id))} className="card-link">Delete</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Read;
