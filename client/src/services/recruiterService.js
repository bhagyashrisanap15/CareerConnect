import api from './api';

export const recruiterService = {
  async getProfile() {
    try {
      const response = await api.get('/recruiter/profile');
      return response.data?.profile || response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch recruiter profile';
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/recruiter/profile', profileData);
      return response.data?.profile || response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update recruiter profile';
    }
  }
};

export default recruiterService;
