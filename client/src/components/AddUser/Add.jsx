import React, { useState } from 'react';
import './add.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const Add = () => {
    const navigate = useNavigate();
    const users = {
        fname: '',
        lname: '',
        email: '',
        password: '',
    };

    const [user, setUser] = useState(users);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/create', user)
            .then((response) => {
                toast.success('User Created Successfully', { position: 'top-right', duration: 2000 });
                navigate('/');
            }).catch((error) => {
                console.log('error', error);
            })
    };
    return (
        <div className='addUser'>
            <Link to={'/'}>Back</Link>

            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First name</label>
                    <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Last name</label>
                    <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
                </div>
                <div className="inputGroup">
                    <Button type="submit">ADD USER</Button>
                </div>
            </form>
        </div>
    )
}

export default Add