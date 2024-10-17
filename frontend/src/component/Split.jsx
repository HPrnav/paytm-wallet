import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Split_expense } from './Split_expense';

export const Split = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null); // Ref to scroll to bottom

    const token = localStorage.getItem('token');
    const currentUserId = token ? jwtDecode(token).userid : null;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await axios.get(`http://localhost:3000/api/v1/group/get_user/${id}`);
                setUser(resp.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching user:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    // Scroll to bottom when the page loads
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [loading]);

    const pay = async (expenseId, groupId) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/group/settle/${groupId}`,
                { expenseId },
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const getMemberName = (memberId) => {
        const member = user.response?.members.find((member) => member._id === memberId);
        return member ? member.name : 'Unknown';
    };

    const isUserInSplit = (expense) => {
        return expense.splitAmong.includes(currentUserId) && !expense.settledMembers.includes(currentUserId);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100" ref={contentRef}>
            <div className=" container  mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Group: {user?.name}</h1>

                {user && user.response.expenses.length > 0 ? (
                    <div className="flex flex-wrap  overflow-scroll justify-center gap-4">
                        {user.response.expenses.map((expense, index) => (
                            <div
                                key={expense._id}
                                className="w-full sm:w-1/3 lg:w-1/4 p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg border border-gray-300 flex flex-col"
                            >
                                <h3 className="text-lg font-bold mb-2">Expense {index + 1}</h3>
                                <p className="mb-2">
                                    <strong>Description:</strong> {expense.description}
                                </p>
                                <p className="mb-2">
                                    <strong>Total Amount:</strong> ₹{expense.amount}
                                </p>
                                <p className="mb-2">
                                    <strong>Individual Share:</strong> ₹{expense.individualShare}
                                </p>
                                <p className="mb-2">
                                    <strong>Settled:</strong> {expense.settled ? 'Yes' : 'No'}
                                </p>

                                {!expense.settled && isUserInSplit(expense) && (
                                    <button
                                        onClick={() => pay(expense._id, user.response._id)}
                                        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        PAY
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">No expenses found for this group.</div>
                )}

                {user && <Split_expense id={user.response._id} />}
            </div>
        </div>
    );
};

export default Split;
