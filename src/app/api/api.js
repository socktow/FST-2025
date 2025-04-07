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
      const response = await fetch('/api/teamconfig');
      if (!response.ok) throw new Error('Failed to fetch team config');
      return await response.json();
    } catch (error) {
      console.error('Error fetching team config:', error);
      throw error;
    }
  },

  update: async (teamData) => {
    try {
      const response = await fetch('/api/teamconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) throw new Error('Failed to update team config');
      return await response.json();
    } catch (error) {
      console.error('Error updating team config:', error);
      throw error;
    }
  },

  reset: async () => {
    try {
      const response = await fetch('/api/teamconfig', {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to reset team config');
      return await response.json();
    } catch (error) {
      console.error('Error resetting team config:', error);
      throw error;
    }
  }
};

export const imageApi = {
  upload: async (file, name, tag) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('tag', tag);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return null;
    }
  },

  getAll: async () => {
    try {
      const res = await fetch('/api/upload');
      if (!res.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await res.json();
      return data.images || [];
    } catch (error) {
      console.error('Failed to get images:', error);
      return [];
    }
  }
};
