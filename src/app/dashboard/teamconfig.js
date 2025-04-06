'use client';
import { useState, useEffect } from 'react';
import { imageApi } from '../api/api';

export default function TeamConfig() {
  const [teamSettings, setTeamSettings] = useState({
    blue: { name: 'Blue Team', tag: 'BLU', logo: '' },
    red: { name: 'Red Team', tag: 'RED', logo: '' },
  });

  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      const imageList = await imageApi.getAll();
      setImages(imageList);
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTeam = (team, field, value) => {
    setTeamSettings(prev => ({
      ...prev,
      [team]: { ...prev[team], [field]: value },
    }));
  };

  const saveSettings = () => {
    alert('Team settings saved!');
    console.log('Saved:', teamSettings);
  };

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TeamInput = ({ team, color }) => (
    <div className={`space-y-4 p-4 border border-${color}-200 rounded-lg bg-${color}-50`}>
      <h4 className={`font-medium text-${color}-700`}>{`${team.charAt(0).toUpperCase() + team.slice(1)} Team`}</h4>

      {/* Team Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          value={teamSettings[team].name}
          onChange={e => updateTeam(team, 'name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter team name"
        />
      </div>

      {/* Tag Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tag Name</label>
        <input
          type="text"
          value={teamSettings[team].tag}
          onChange={e => updateTeam(team, 'tag', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter tag (max 4 chars)"
          maxLength={4}
        />
      </div>

      {/* Logo Select with Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Logo</label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logo..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <select
            value={teamSettings[team].logo}
            onChange={e => updateTeam(team, 'logo', e.target.value)}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a logo</option>
            {isLoading ? (
              <option disabled>Loading logos...</option>
            ) : filteredImages.length === 0 ? (
              <option disabled>No logos found</option>
            ) : (
              filteredImages.map(image => (
                <option key={image.url} value={image.url}>
                  {image.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Preview */}
        {teamSettings[team].logo && (
          <div className="mt-2">
            <img
              src={teamSettings[team].logo}
              alt="Selected logo"
              className="w-20 h-20 object-contain border rounded"
            />
          </div>
        )}
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
          <button
            onClick={saveSettings}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
