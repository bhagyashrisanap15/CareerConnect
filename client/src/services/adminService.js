import api from './api';

export const adminService = {
  async getDashboardStats() {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch admin stats';
    }
  },

  async getUsers() {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch users';
    }
  },

  async toggleUserBlock(userId) {
    try {
      const response = await api.patch(`/admin/users/${userId}/block`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update user block state';
    }
  },

  async deleteUser(userId) {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete user';
    }
  },

  async getAdminJobs() {
    try {
      const response = await api.get('/admin/jobs');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch admin jobs';
    }
  },

  async deleteAdminJob(id) {
    try {
      const response = await api.delete(`/admin/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete job';
    }
  },

  async getAdminCompanies() {
    try {
      const response = await api.get('/admin/companies');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch companies';
    }
  },

  async approveCompany(id) {
    try {
      const response = await api.patch(`/admin/companies/${id}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to approve company';
    }
  },

  async deleteCompany(id) {
    try {
      const response = await api.delete(`/admin/companies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete company';
    }
  },

  async getAdminApplications() {
    try {
      const response = await api.get('/admin/applications');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch applications';
    }
  }
};

export default adminService;
