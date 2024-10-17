import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export function Group() {
  const [group_list, setGroupList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // To track if the list is expanded
  const navigate = useNavigate();
  const visibleGroupCount = 5; // Number of groups to show by default

  const fetchgroup = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/group/group_list', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setGroupList(response.data.group_list);
    } catch (error) {
      console.error('Error fetching grouplist:', error);
    }
  };

  useEffect(() => {
    fetchgroup();
  }, []);

  // Toggle between expanded and collapsed states
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-2/6 max-w-3xl bg-blue-50 mx-3 p-3 border border-gray-400">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-2xl text-sky-800">Groups</div>
        <button
          onClick={() => navigate('/Create_group')}
          className="bg-sky-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-sky-700 hover:scale-105"
        >
          + Add Group
        </button>
      </div>

      <div className="space-y-4">
        {/* Render only a limited number of groups initially */}
        {group_list.slice(0, isExpanded ? group_list.length : visibleGroupCount).map((grp) => (
          <Single_Group key={grp._id} group={grp} />
        ))}
      </div>

      {/* Show "Expand" or "Collapse" button if there are more groups than the default visible count */}
      {group_list.length > visibleGroupCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleExpand}
            className="bg-sky-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-sky-700 hover:scale-105"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      )}
    </div>
  );
}

function Single_Group({ group }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between items-center bg-white border border-slate-200 shadow-sm rounded-md p-4 transition-all duration-300 hover:shadow-lg hover:bg-slate-50">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-sky-200 flex justify-center items-center mr-4">
          <span className="text-xl font-bold text-sky-700">{group.name[0]}</span>
        </div>
        <div className="text-lg font-semibold text-sky-800">{group.name}</div>
      </div>
      <div>
        <Button
          onClick={() => navigate('/Split?id=' + group._id)}
          label="Manage"
          className="bg-sky-600 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-sky-700 hover:scale-105"
        />
      </div>
    </div>
  );
}
