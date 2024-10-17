import { useState, useEffect } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleUsersCount, setVisibleUsersCount] = useState(5); // Initially display 5 users
  const [expanded, setExpanded] = useState(false); // Track expand/collapse state

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  const toggleExpand = () => {
    if (expanded) {
      setVisibleUsersCount(5); // Show only 5 users when collapsed
    } else {
      setVisibleUsersCount(users.length); // Show all users when expanded
    }
    setExpanded(!expanded); // Toggle the state
  };
 
  return (
    <div className="flex-col w-full border border-slate-400 md:w-full bg-blue-50 lg:w-1/2 mx-auto p-4">
      <div className="font-bold text-2xl text-sky-800 mb-6">Users</div>

      <div className="mb-4">
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-sky-500"
        />
      </div>

      <div className="space-y-4">
        {users.slice(0, visibleUsersCount).map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>

      {users.length > 5 && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={toggleExpand}
            label={expanded ? "Collapse" : "Expand"}
            className="bg-sky-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-700 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
};

function User({ user }) {
    const navigate= useNavigate();

  return (
    <div className="flex justify-between items-center bg-white border border-slate-200 shadow-sm rounded-md p-4 transition-all duration-300 hover:shadow-lg hover:bg-slate-50">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-sky-200 flex justify-center items-center mr-4">
          <span className="text-xl font-bold text-sky-700">{user.firstname[0]}</span>
        </div>
        <div className="text-lg font-semibold text-sky-800">
          {user.firstname} {user.lastname}
        </div>
      </div>

      <div>
        <Button
          onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstname)}
          label="Send Money"
          className="bg-sky-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-700 hover:scale-105"
        />
      </div>
    </div>
  );
}
