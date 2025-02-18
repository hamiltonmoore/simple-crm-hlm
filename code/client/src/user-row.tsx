import { useState } from "react";
import { User } from "./types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.put(`/api/users/${user.id}`, {
                firstName,
                lastName,
                age,
                phoneNumber,
            });
            setSuccess(true);
            setIsEditing(false);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };

    const handleSubmitNote = async (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with your actual endpoint and note submission logic.
        try {
            await axios.post(`/api/users/${user.id}/notes`, { note });
            // Reset note state and hide the note form
            setNote("");
            setIsAddingNote(false);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data || "Failed to add note");
        }
    };

    const handleEditClick = () => {
        navigate(`/user/${user.id}`);
    };

    if (isEditing) {
        return (
            <tr>
                <td colSpan={6}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96">
                        <h2 className="text-xl font-fold">Edit</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && (
                            <p className="text-green-500">User added successfully</p>
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full p-2 bg-blue-500 text-white rounded">
                            Update User
                        </button>
                    </form>
                </td>
            </tr>
        );
    }

    if (isAddingNote) {
        return (
            <tr>
                <td colSpan={6}>
                    <form
                        onSubmit={handleSubmitNote}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96"
                    >
                        <h2 className="text-xl font-bold">Add Note</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <textarea
                            placeholder="Enter note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="block w-full p-2 bg-blue-500 text-white rounded"
                        >
                            Submit Note
                        </button>
                    </form>
                </td>
            </tr>
        )
    }

    return (
        <tr key={user.id}>
            <td>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </td>
            <td>
                <button onClick={() => setIsAddingNote(true)}>Add Note</button>
            </td>
            <td>
                <button onClick={handleEditClick}>Edit Page</button>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{phoneNumber}</td>
        </tr>
    );
};
