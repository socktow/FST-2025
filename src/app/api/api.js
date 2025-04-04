export const playerConfigApi = {
  getAll: async () => {
    try {
      const { PlayerNameConfig = [] } = await (await fetch('/api/playerconfig')).json();
      return PlayerNameConfig;
    } catch (error) {
      console.error('Failed to fetch player config:', error);
      return [];
    }
  },

  update: async (customNames) => {
    try {
      const { PlayerNameConfig = [] } = await (await fetch('/api/playerconfig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customNames }),
      })).json();
      return PlayerNameConfig;
    } catch (error) {
      console.error('Failed to update player config:', error);
      return [];
    }
  },

  reset: async () => {
    try {
      const { message } = await (await fetch('/api/playerconfig', { method: 'DELETE' })).json();
      if (message === "All player names have been reset.") return { success: true, message };
      throw new Error("Invalid reset response format");
    } catch (error) {
      console.error('Failed to reset player config:', error);
      return { success: false, message: error.message || 'Failed to reset player config' };
    }
  }
};

export const teamConfigApi = {
  getAll: async () => {
    try {
      const { TeamConfig = [] } = await (await fetch('/api/teamconfig')).json();
      return TeamConfig;
    } catch (error) {
      console.error('Failed to fetch team config:', error);
      return [];
    }
  },

  update: async (teamData) => {
    try {
      const { TeamConfig = [] } = await (await fetch('/api/teamconfig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamData }),
      })).json();
      return TeamConfig;
    } catch (error) {
      console.error('Failed to update team config:', error);
      return [];
    }
  },

  reset: async () => {
    try {
      const { message } = await (await fetch('/api/teamconfig', { method: 'DELETE' })).json();
      if (message === "All team configurations have been reset.") return { success: true, message };
      throw new Error("Invalid reset response format");
    } catch (error) {
      console.error('Failed to reset team config:', error);
      return { success: false, message: error.message || 'Failed to reset team config' };
    }
  }
};
