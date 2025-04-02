export const parseGameData = (rawData) => {
  try {
    // Check if rawData is a string and try to parse it
    const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    
    // Validate the data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    // Extract and validate required fields with default values
    const parsedData = {
      scoreboard: {
        blueTeam: {
          towers: parseInt(data.scoreboard?.blueTeam?.towers) || 0,
          kills: parseInt(data.scoreboard?.blueTeam?.kills) || 0,
          gold: data.scoreboard?.blueTeam?.gold || "0K"
        },
        redTeam: {
          towers: parseInt(data.scoreboard?.redTeam?.towers) || 0,
          kills: parseInt(data.scoreboard?.redTeam?.kills) || 0,
          gold: data.scoreboard?.redTeam?.gold || "0K"
        }
      },
      teamData: {
        blueTeam: {
          name: data.teamData?.blueTeam?.name || "BLUE"
        },
        redTeam: {
          name: data.teamData?.redTeam?.name || "RED"
        }
      },
      gameTime: data.gameTime || "00:00"
    };

    return parsedData;
  } catch (error) {
    console.error('Error parsing game data:', error);
    // Return default data structure in case of error
    return {
      scoreboard: {
        blueTeam: { towers: 0, kills: 0, gold: "0K" },
        redTeam: { towers: 0, kills: 0, gold: "0K" }
      },
      teamData: {
        blueTeam: { name: "BLUE" },
        redTeam: { name: "RED" }
      },
      gameTime: "00:00"
    };
  }
}; 