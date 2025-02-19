import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "./types";

export const UserPage: React.FC = () => {
  const [isAddingNote, setIsAddingNote] = useState(false);
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
        setIsAddingNote(false);
        
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

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
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h1>
      <p>Age: {user.age}</p>
      <p>Phone: {user.phoneNumber}</p>

      <h2 className="text-xl mt-4">Notes</h2>
      {user.notes && user.notes.length > 0 ? (
        <ul className="list-disc ml-6">
          {user.notes.map((note) => (
            <li key={note.id}>
              {note.content}{" "}
              <span className="text-gray-500 text-sm">
                ({new Date(note.createdAt).toLocaleString()})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
      <div>
        <button onClick={() => setIsAddingNote(true)}>Add Note</button>
      </div>
    </div>
  );
};
