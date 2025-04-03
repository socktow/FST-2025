"use client";

import { useState } from 'react';

export default function TeamConfig() {
  const [teamSettings, setTeamSettings] = useState({
    blue: { name: 'Blue Team', tag: 'BLU', color: '#0047AB', logo: null },
    red: { name: 'Red Team', tag: 'RED', color: '#E32636', logo: null },
  });

  const updateTeam = (team, field, value) => {
    setTeamSettings(prev => ({
      ...prev,
      [team]: { ...prev[team], [field]: value },
    }));
  };

  const handleLogo = (team, e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = evt => updateTeam(team, 'logo', evt.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveSettings = () => {
    alert('Team settings saved!');
    console.log('Saved:', teamSettings);
  };

  const TeamInput = ({ team, color }) => (
    <div className={`space-y-4 p-4 border border-${color}-200 rounded-lg bg-${color}-50`}>
      <h4 className={`font-medium text-${color}-700`}>{`${team.charAt(0).toUpperCase() + team.slice(1)} Team`}</h4>
      {['name', 'tag'].map(field => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700">{`${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
          <input
            type="text"
            value={teamSettings[team][field]}
            onChange={e => updateTeam(team, field, e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-${color}-500 focus:ring-${color}-500 sm:text-sm`}
            placeholder={`Enter ${team} team ${field}`}
            maxLength={field === 'tag' ? 4 : undefined}
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Color</label>
        <div className="flex items-center mt-1">
          <input
            type="color"
            value={teamSettings[team].color}
            onChange={e => updateTeam(team, 'color', e.target.value)}
            className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-500">{teamSettings[team].color}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Logo</label>
        <div className="mt-1 flex items-center">
          {teamSettings[team].logo ? (
            <div className="relative group">
              <img src={teamSettings[team].logo} alt={`${team} Team Logo`} className="w-20 h-20 object-contain border rounded" />
              <button onClick={() => updateTeam(team, 'logo', null)} className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Remove</span>
              </button>
            </div>
          ) : (
            <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500">
              <span className="text-gray-500 text-xs text-center">Upload Logo</span>
              <input type="file" className="hidden" accept="image/*" onChange={e => handleLogo(team, e)} />
            </label>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team Configuration</h2>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Team Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TeamInput team="blue" color="blue" />
          <TeamInput team="red" color="red" />
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={saveSettings} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}