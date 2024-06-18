import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Balance() {
  // State to manage balance and error
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  // Function to fetch balance from API
  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
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
    <div className="rounded-lg m-3 border border-black">
      <div className="pl-3 font-semibold">
         Current Balance is: { balance.toFixed(2)}
      </div>
    </div>
  );
}

export default Balance;
