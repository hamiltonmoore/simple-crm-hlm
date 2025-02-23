import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './types';

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/users/${user.id}`);
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
    </tr>
  );
};