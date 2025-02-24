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
        <div className="p-4">
            <div className="w-full">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="text-gray-700">
                            <th className="p-2"></th>
                            <th className="p-2 text-center">First Name</th>
                            <th className="p-2 text-center">Last Name</th>
                            <th className="p-2 text-center">Age</th>
                            <th className="p-2 text-center">Phone Number</th>
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
            <div className="mt-12 max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
                <AddUser />
            </div>
        </div>
    );
};
