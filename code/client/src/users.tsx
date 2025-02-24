import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserRow } from './user-row';
import { AddUser } from './add-user';
import { setUsers } from './store/userSlice';
import { RootState } from './store/index';

export const Users: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/api/users');
                dispatch(setUsers(result.data));
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <table className="table-auto w-full bg-gray-100 rounded">
                    <thead>
                        <tr className="text-left text-gray-700">
                            <th className="p-2"></th>
                            <th className="p-2">First Name</th>
                            <th className="p-2">Last Name</th>
                            <th className="p-2">Age</th>
                            <th className="p-2">Phone Number</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserRow user={user} key={user.id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <AddUser />
        </div>
    );
};
