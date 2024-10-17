import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Balance() {
  // State to manage balance and error
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect

  // Function to fetch balance from API
  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setBalance(response.data.balance); // Update balance state
    } catch (error) {
      setError(error.message); // Update error state
      console.error('Error fetching balance:', error); // Log error for debugging
    }
  };

  // useEffect to call fetchBalance on component mount
  useEffect(() => {
    fetchBalance();
  }, []); // Empty dependency array ensures it only runs on mount

  return (
    <div className="relative m-3 inline-block">
      {/* Balance Box */}
      <div
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        View Balance
      </div>

      {/* Sliding Balance Display */}
      <div
        className={`absolute top-0 left-full   py-2 bg-white text-black border border-sky-600 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${isHovered ? 'translate-x-0' : 'translate-x-full opacity-0 pointer-events-none'}`}
      >
        {balance.toFixed(2)+'__rs'} 
      </div>
    </div>
  );
}

export default Balance;
