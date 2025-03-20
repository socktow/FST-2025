const Scoreboard = ({ scoreboard }) => {
    return (
      <div className="mt-4 p-3 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold">Scoreboard</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-left">Gold</th>
              <th className="px-4 py-2 text-left">Kills</th>
              <th className="px-4 py-2 text-left">Towers</th>
              <th className="px-4 py-2 text-left">Grubs</th>
              <th className="px-4 py-2 text-left">Dragons</th>
              <th className="px-4 py-2 text-left">Feats of Strength</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map((team, index) => (
              <tr key={index} className="border-t border-gray-600">
                <td className="px-4 py-2">Team {index + 1}</td>
                <td className="px-4 py-2">{team.gold}</td>
                <td className="px-4 py-2">{team.kills}</td>
                <td className="px-4 py-2">{team.towers}</td>
                <td className="px-4 py-2">{team.grubs}</td>
                <td className="px-4 py-2">{team.dragons.join(", ")}</td>
                <td className="px-4 py-2">
                  <ul className="list-disc pl-5">
                    {Object.entries(team.featsOfStrength).map(([key, value]) => (
                      <li key={key}>
                        {key}: <span className="text-yellow-400">{value.toString()}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Scoreboard;
  