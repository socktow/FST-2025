// Player Config API
export const playerConfigApi = {
  // Get all player configs
  getAll: async () => {
    try {
      const response = await fetch('/api/playerconfig');
      const data = await response.json();
      return data.PlayerNameConfig || [];
    } catch (error) {
      console.error('Failed to fetch player config:', error);
      return [];
    }
  },

  // Update player configs
  update: async (customNames) => {
    try {
      const response = await fetch('/api/playerconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customNames }),
      });
      const data = await response.json();
      return data.PlayerNameConfig || [];
    } catch (error) {
      console.error('Failed to update player config:', error);
      return [];
    }
  },

  // Reset all player configs
  reset: async () => {
    try {
      const response = await fetch('/api/playerconfig', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message === "All player names have been reset.") {
        return { success: true, message: "All player names have been reset." };
      } else {
        throw new Error("Reset response format is invalid");
      }
    } catch (error) {
      console.error('Failed to reset player config:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to reset player config' 
      };
    }
  }
};
