import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActiveModel = () => {
  const [showGold, setShowGold] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [showRune, setShowRune] = useState(false);

  const handleToggle = (label, stateSetter, currentState) => {
    const newState = !currentState;
    stateSetter(newState);
    toast.success(`${label} turned ${newState ? 'On' : 'Off'}`, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
    });
  };

  const renderToggle = (label, value, toggleFunc) => (
    <div className="min-w-[200px] flex-shrink-0 flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm mx-2">
      <span className="text-gray-700 font-medium">{label}</span>
      <button
        onClick={toggleFunc}
        className={`px-4 py-1 rounded-full font-semibold text-sm transition-colors duration-200 ${
          value
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        {value ? 'On' : 'Off'}
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Active Model</h2>
      <p className="mb-4 text-gray-600">Manage the active model here.</p>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Feature Toggles</h3>

        {/* Swipeable row */}
        <div className="flex overflow-x-auto scrollbar-hide -mx-2 pb-2">
          {renderToggle('Show Gold', showGold, () => handleToggle('Show Gold', setShowGold, showGold))}
          {renderToggle('Show Exp', showExp, () => handleToggle('Show Exp', setShowExp, showExp))}
          {renderToggle('Show Rune', showRune, () => handleToggle('Show Rune', setShowRune, showRune))}
        </div>

        <div className="mt-6 border-t pt-4 text-gray-700 font-semibold">
          <p>Is Comming: <span className="text-blue-600">Yes</span></p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ActiveModel;
