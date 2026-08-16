import api from './api';

export const jobService = {
  async getAllJobs(filters = {}) {
    try {
      const response = await api.get('/jobs', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch jobs';
    }
  },

  async getJobById(id) {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Job not found';
    }
  },

  async createJob(jobData) {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create job';
    }
  },

  async updateJob(id, jobData) {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update job';
    }
  },

  async deleteJob(id) {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete job';
    }
  }
};

export default jobService;
