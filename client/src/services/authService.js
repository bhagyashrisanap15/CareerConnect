import api from './api';

const extractErrorMessage = (error, defaultMessage) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
};

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, 'Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, 'Registration failed');
    }
  },

  async signup(userData) {
    return this.register(userData);
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, 'Failed to fetch profile');
    }
  },

  async me() {
    return this.getProfile();
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, 'Failed to update profile');
    }
  },

  async changePassword(passwordData) {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error, 'Failed to change password');
    }
  },

  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch {
      return { success: true };
    }
  },
};

export default authService;
