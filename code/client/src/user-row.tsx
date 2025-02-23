import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { User } from './types';
import axios from 'axios';

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProfileClick = () => {
        navigate(`/users/${user.id}`);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        dispatch(deleteUserStart());
        try {
            await axios.delete(`/api/users/${user.id}`);
            dispatch(deleteUserSuccess(user.id));
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) && err.response?.data
                ? err.response.data
                : 'Failed to delete user';
            dispatch(deleteUserFailure(errorMessage));
        }
    };

    return (
        <tr key={user.id}>
            <td>
                <button
                    onClick={handleProfileClick}
                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    View Profile
                </button>
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.age}</td>
            <td>{user.phoneNumber}</td>
            <button
                onClick={handleDelete}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Delete
            </button>
        </tr>
    );
};