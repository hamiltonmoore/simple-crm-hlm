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
        <div>
            <div className="w-full">
                <h2 className="text-xl font-fold">Users</h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserRow user={user} key={user.id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <AddUser/>
        </div>
    );
};
