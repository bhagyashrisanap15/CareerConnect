import api from './api';

export const studentService = {
  async getProfile() {
    try {
      const response = await api.get('/student/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch student profile';
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/student/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile';
    }
  },

  async uploadResume(formData) {
    try {
      const response = await api.post('/student/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to upload resume';
    }
  },

  async getSavedJobs() {
    try {
      const response = await api.get('/student/saved-jobs');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch saved jobs';
    }
  },

  async saveJob(jobId) {
    try {
      const response = await api.post(`/student/saved-jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to save job';
    }
  },

  async unsaveJob(jobId) {
    try {
      const response = await api.delete(`/student/saved-jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to unsave job';
    }
  }
};

export default studentService;
