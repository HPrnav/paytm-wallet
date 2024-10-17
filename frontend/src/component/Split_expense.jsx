import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const Split_expense = ({ id }) => {
    const [members, setMembers] = useState([]);
    const [userList, setUserList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filter, setFilter] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.id;

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            setUserList(response.data.users);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const handleAddMember = (user) => {
        setMembers((prevMembers) => [...prevMembers, user]);
    };

    const handleCreateExpense = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/group/${id}/expense`,
                {
                    description,
                    amount,
                    paidBy: userId,
                    splitAmong: members.map((member) => member._id),
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            if (response.status === 200) {
                navigate('/dash');
            }
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto bg-sky-100 rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row lg:space-x-4 mb-6">
                <div className=" w-full md:w-1/3">
                    <label htmlFor="description" className="font-bold block mb-2 text-sky-800">
                        Expense Description
                    </label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        className="border border-sky-300 p-2 w-full rounded-md"
                        placeholder="Enter description"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <label htmlFor="amount" className="font-bold block mb-2 text-sky-800">
                        Amount
                    </label>
                    <input
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        name="amount"
                        className="border border-sky-300 p-2 w-full rounded-md"
                        placeholder="Enter amount"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <button
                        onClick={() => setShowDropdown(true)}
                        className="bg-sky-600 text-white px-4 py-2 rounded-md transition hover:bg-sky-500"
                    >
                        Add Members
                    </button>
                    {members.length > 0 ? (
                        <button
                            onClick={handleCreateExpense}
                            className="bg-sky-600 text-white px-4 py-2 rounded-md mt-2 transition hover:bg-sky-500"
                        >
                            Create Expense
                        </button>
                    ) : (
                        <button className="bg-slate-300 text-white px-4 py-2 rounded-md mt-2" disabled>
                            Create Expense
                        </button>
                    )}
                </div>
            </div>

            {/* Popup Modal for Adding Members */}
            {showDropdown && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            onClick={() => setShowDropdown(false)}
                            className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-2 py-1"
                        >
                            X
                        </button>
                        <h2 className="text-lg font-bold mb-4">Add Members</h2>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Search users..."
                            className="w-full px-2 py-2 border border-sky-300 rounded-md mb-4"
                        />
                        <div className="max-h-40 overflow-y-auto">
                            {userList.length > 0 ? (
                                userList.map((user) => (
                                    <div
                                        key={user._id}
                                        className="cursor-pointer hover:bg-sky-100 p-2 transition"
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
                            className="bg-amber-500 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Selected Members */}
            <div className="mt-6">
                <h3 className="font-bold text-sky-800">Selected Members:</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                    {members.map((member) => (
                        <div
                            key={member._id}
                            className="p-4 bg-gradient-to-r from-sky-300 to-sky-500 text-white rounded-lg shadow-md"
                        >
                            {member.firstname} {member.lastname}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
