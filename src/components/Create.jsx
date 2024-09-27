import React,{useState}  from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/UserDetailsSlice";

const Create = () => {
 
const [users,setUsers]=useState({})
const navigate=useNavigate()
const dispatch=useDispatch()

const getUserData =(e)=>{
  setUsers({...users,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(users);
  dispatch(createUser(users))
  navigate('/read')
}





  return (
    <div>
      <h2 className="my-2">Enter the data</h2>

      <form className="w-50 mx-auto my-45"  onSubmit={handleSubmit} >
        <div>
        <label  class="form-label">Name</label>
        <input type="text" class="form-control" name="name"onChange={getUserData} />
        </div>
        <div>
        <label  class="form-label">email</label>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            className="form-control"
            onChange={getUserData}
           
          />
        </div>
        <div>
        <label  class="form-label">email</label>

          <input
            type="number"
            name="age"
            placeholder="enter age"
            className="form-control"
            onChange={getUserData}
          
          />
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value='male'
            class="form-check-input"
             onChange={getUserData}
          />
          <label className="form-check-lable">Male</label>
          <input
            type="radio"
            name="gender"
            value='female'               
            class="form-check-input" 
            onChange={getUserData}
          />
          <label className="form-check-lable">Famale</label>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Create;