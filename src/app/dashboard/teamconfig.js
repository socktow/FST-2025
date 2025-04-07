import { useState, useEffect } from "react";
import { imageApi, teamConfigApi } from "../api/api";
import { RefreshCw, Save, Undo2 } from "lucide-react";

export default function TeamConfig() {
  const [teamSettings, setTeamSettings] = useState({
    blue: { name: "Blue Team", tag: "BLU", logo: "" },
    red: { name: "Red Team", tag: "RED", logo: "" },
  });

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [teamConfig, imageList] = await Promise.all([
        teamConfigApi.getAll(),
        imageApi.getAll(),
      ]);
      setTeamSettings(teamConfig);
      setImages(imageList);
    } catch (error) {
      setError("Failed to load data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTeam = (team, field, value) => {
    setTeamSettings((prev) => ({
      ...prev,
      [team]: { ...prev[team], [field]: value },
    }));
  };

  const saveSettings = async () => {
    try {
      setIsLoading(true);
      await teamConfigApi.update(teamSettings);
      alert("Team settings saved successfully!");
    } catch (error) {
      setError("Failed to save settings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSettings = async () => {
    if (window.confirm("Are you sure you want to reset all team settings?")) {
      try {
        setIsLoading(true);
        const defaultConfig = await teamConfigApi.reset();
        setTeamSettings(defaultConfig);
        alert("Team settings have been reset to default.");
      } catch (error) {
        setError("Failed to reset settings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const TeamCard = ({ team, color }) => {
    const t = teamSettings[team];

    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 border flex flex-col gap-4">
        <h4 className={`text-xl font-semibold text-${color}-600`}>{t.name}</h4>

        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              value={t.name}
              onChange={(e) => updateTeam(team, "name", e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              placeholder="Enter team name"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Team Tag</label>
            <input
              type="text"
              value={t.tag}
              onChange={(e) => updateTeam(team, "tag", e.target.value)}
              maxLength={4}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              placeholder="Enter tag (max 4 characters)"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Logo</label>
            <select
              value={t.logo}
              onChange={(e) => updateTeam(team, "logo", e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              disabled={isLoading}
            >
              <option value="">Choose a logo...</option>
              {images.map((img) => (
                <option key={img.url} value={img.url}>
                  {img.tag ? `${img.name} - ${img.tag}` : img.name}
                </option>
              ))}
            </select>
          </div>

          {t.logo && (
            <div className="flex justify-center">
              <img
                src={t.logo}
                alt="Team logo"
                className="w-20 h-20 object-contain rounded border mt-2"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">⚙️ Team Configuration</h2>
        <button
          onClick={resetSettings}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
        >
          <Undo2 size={16} />
          Reset
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamCard team="blue" color="blue" />
        <TeamCard team="red" color="red" />
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow transition disabled:opacity-50"
        >
          <Save size={18} />
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
