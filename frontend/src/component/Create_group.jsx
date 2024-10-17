import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Create_group = () => {
  const [members, setMembers] = useState([]); // To keep track of selected members
  const [userList, setUserList] = useState([]); // To store the list of users
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown visibility
  const [filter, setFilter] = useState(""); // For search filtering
  const [group_name, setGroupName] = useState('');
  const navigate = useNavigate();

  // Fetch user list when the component is mounted or filter changes
  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserList(response.data.users);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  // Function to handle adding a member
  const handleAddMember = (user) => {
    setMembers((prevMembers) => [...prevMembers, user]);
  };

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/group/create',
        {
          name: group_name,
          members: members.map((member) => member._id), // Extract only _id from each member object
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (response.status === 200) {
        navigate('/dash');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className=" min-h-full bg-gradient-to-r from-sky-200 via-gray-50 to-sky-200 animate-gradient bg-100% bg-0%">

        <div className="flex items-center justify-center min-h-screen relative">
        <div className="absolute inset-0 text-gray-200 text-9xl font-extrabold opacity-10 text-center">
            $
        </div>
        <div className="relative z-10 bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">Create a Group</h1>

            <div>
            <label htmlFor="groupName" className="font-bold text-gray-700">
                Group Name
            </label>
            <input
                onChange={(e) => setGroupName(e.target.value)}
                name="groupName"
                className="border p-2 w-full mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter group name"
            />
            </div>

            <div className="mt-6">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-sky-600 text-white px-4 py-2 rounded-md w-full transition-all duration-300 hover:bg-sky-700"
            >
                Add Members
            </button>
            </div>

            {showDropdown && (
            <div className="border p-2 mt-2 bg-white shadow-md rounded-md">
                {/* Search Input for Filtering Users */}
                <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search users..."
                className="w-full px-2 py-1 border rounded-md border-slate-200 mb-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                {/* Dropdown User List */}
                <div className="max-h-40 overflow-y-auto">
                {userList.length > 0 ? (
                    userList.map((user) => (
                    <div
                        key={user._id}
                        className="cursor-pointer hover:bg-slate-200 p-2 rounded-md transition-all"
                        onClick={() => handleAddMember(user)}
                    >
                        {user.firstname} {user.lastname}
                    </div>
                    ))
                ) : (
                    <div>No users found.</div>
                )}
                </div>
                <button
                onClick={() => setShowDropdown(false)}
                className="bg-amber-500 text-white mt-2 px-4 py-2 rounded-md w-full transition-all duration-300 hover:bg-amber-600"
                >
                Show Less
                </button>
            </div>
            )}

            <div className="mt-6">
            <h3 className="font-bold text-gray-700">Selected Members:</h3>
            <ul className="list-disc list-inside mt-2">
                {members.map((member) => (
                <li key={member._id} className="text-gray-700">
                    {member.firstname} {member.lastname}
                </li>
                ))}
            </ul>
            </div>

            <div className="mt-6">
            <button
                onClick={members.length > 0 ? handleCreateGroup : null}
                className={`${
                members.length > 0
                    ? 'bg-sky-600 hover:bg-sky-700'
                    : 'bg-slate-300 cursor-not-allowed'
                } text-white px-4 py-2 rounded-md w-full transition-all duration-300`}
                disabled={members.length === 0}
            >
                Create Group
            </button>
            </div>
        </div>
        </div>
    </div>
  );
};
