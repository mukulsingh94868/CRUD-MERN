import React, { useEffect, useState } from 'react';
import '../AddUser/add.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = {
    fname: '',
    lname: '',
    email: ''
  };
  const [user, setUser] = useState(users);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response?.data);
      }).catch((error) => {
        console.log('error', error);
      })
  }, [id, navigate]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success('User Updated Successfully', { position: 'top-right', duration: 2000 });
        navigate('/');
      }).catch((error) => {
        console.log('error', error);
      })
  };
  return (
    <div className='addUser'>
      <Link to={'/'}>Back</Link>

      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input type="text" onChange={inputHandler} value={user?.fname} id="fname" name="fname" autoComplete='off' placeholder='First name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input type="text" onChange={inputHandler} value={user?.lname} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} value={user?.email} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <Button type="submit">UPDATE USER</Button>
        </div>
      </form>
    </div>
  )
}

export default Edit