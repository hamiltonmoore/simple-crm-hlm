import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "./types";

export const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.post(`/api/users/${user.id}/notes`, { note });
        setNote("");
        
        // Get & set updated notes
        const response = await axios.get(`/api/users/${user.id}`);
        setUser(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Failed to add note.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  if (loading) return <div className="text-center text-lg py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!user) return <div className="text-center text-gray-600">User not found</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
      <div className="mb-4">
        <p className="text-gray-700">Age: <span className="font-semibold">{user.age}</span></p>
        <p className="text-gray-700">Phone: <span className="font-semibold">{user.phoneNumber}</span></p>
      </div>

      <h2 className="text-xl mt-4 font-semibold">Notes</h2>
      {user.notes && user.notes.length > 0 ? (
        <ul className="list-disc ml-6 mt-2">
          {user.notes.map((note) => (
            <li key={note.id} className="mb-2">
              {note.content}{" "}
              <span className="text-gray-500 text-sm">
                ({new Date(note.createdAt).toLocaleString()})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No notes available.</p>
      )}

      <form 
        onSubmit={handleSubmitNote}
        className="mt-4 space-y-4 p-4 rounded bg-gray-100"
      >
        <h2 className="text-xl font-bold mb-2">Add Note</h2>
        {error && <p className="text-red-500">{error}</p>}
        <textarea 
          placeholder="Enter note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded resize-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Submit Note
        </button>
      </form>
    </div>
  );
};