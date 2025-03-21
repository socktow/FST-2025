'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [formData, setFormData] = useState({
    team1: { name: '', logo: '' },
    team2: { name: '', logo: '' },
    players: Array(10).fill('')
  });

  const [message, setMessage] = useState('');

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      if (data.matchData) {
        setFormData({
          team1: data.matchData.team1,
          team2: data.matchData.team2,
          players: [...(data.matchData.players.blue || []), ...(data.matchData.players.red || [])]
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team1: formData.team1.name,
          team2: formData.team2.name,
          logo1: formData.team1.logo,
          logo2: formData.team2.logo,
          players: formData.players
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Lỗi khi cập nhật dữ liệu');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [team, field] = name.split('_');
    
    setFormData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Quản lý thông tin trận đấu</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Team 1 Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">RED TEAM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đội
                </label>
                <input
                  type="text"
                  name="team1_name"
                  value={formData.team1.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  name="team1_logo"
                  value={formData.team1.logo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Team 2 Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">BLUE TEAM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đội
                </label>
                <input
                  type="text"
                  name="team2_name"
                  value={formData.team2.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  name="team2_logo"
                  value={formData.team2.logo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Players Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Danh sách tuyển thủ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Red Team Players */}
              <div>
                <h3 className="text-lg font-medium text-red-600 mb-2">RED TEAM</h3>
                {formData.players.slice(0, 5).map((player, index) => (
                  <div key={`red-${index}`} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tuyển thủ {index + 1}
                    </label>
                    <input
                      type="text"
                      name={`player_${index}`}
                      value={player}
                      onChange={(e) => {
                        const newPlayers = [...formData.players];
                        newPlayers[index] = e.target.value;
                        setFormData(prev => ({ ...prev, players: newPlayers }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                ))}
              </div>
              {/* Blue Team Players */}
              <div>
                <h3 className="text-lg font-medium text-blue-600 mb-2">BLUE TEAM</h3>
                {formData.players.slice(5, 10).map((player, index) => (
                  <div key={`blue-${index}`} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tuyển thủ {index + 1}
                    </label>
                    <input
                      type="text"
                      name={`player_${index + 5}`}
                      value={player}
                      onChange={(e) => {
                        const newPlayers = [...formData.players];
                        newPlayers[index + 5] = e.target.value;
                        setFormData(prev => ({ ...prev, players: newPlayers }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cập nhật
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mt-4 p-4 rounded-md bg-green-100 text-green-700">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
