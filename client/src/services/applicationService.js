import api from './api';

export const applicationService = {
  async applyForJob(jobId, applicationData) {
    try {
      const response = await api.post(`/applications/${jobId}`, applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to submit application';
    }
  },

  async getStudentApplications() {
    try {
      const response = await api.get('/applications/student');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch applications';
    }
  },

  async getJobApplicants(jobId) {
    try {
      const response = await api.get(`/applications/job/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch applicants';
    }
  },

  async getApplicantDetails(id) {
    try {
      const response = await api.get(`/applications/detail/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch applicant details';
    }
  },

  async updateStatus(applicationId, status) {
    try {
      const response = await api.patch(`/applications/${applicationId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update status';
    }
  },

  async withdrawApplication(id) {
    try {
      const response = await api.delete(`/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to withdraw application';
    }
  }
};

export default applicationService;
