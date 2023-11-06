import React, { useEffect, useState } from 'react';
import './User.css';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8000/api/getall');
            setUsers(response?.data);
        };

        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((respones) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success('Deleted Successfully', { position: 'top-right' })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className='userTable'>
            <Link to={"/add"} className='addButton'>Add User</Link>

            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !!users && users?.map((user, index) => {
                            return (
                                <tr key={user?._id}>
                                    <td>{index + 1}</td>
                                    <td>{`${user?.fname} ${user?.lname}`}</td>
                                    <td>{user?.email}</td>
                                    <td className='actionButtons'>
                                        <Button onClick={() => deleteUser(user._id)}><DeleteIcon /></Button>
                                        <Button className='editButton' onClick={() => navigate(`/edit/${user?._id}`)}><EditIcon /></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User