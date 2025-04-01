
export const checkAuth = () => {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      return Boolean(user && token); // Explicit boolean conversion
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return false;
    }
  };
  
  export const clearAuth = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };