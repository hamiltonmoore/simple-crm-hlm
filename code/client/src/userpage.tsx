import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "./types";

export const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

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
    </div>
  );
};
