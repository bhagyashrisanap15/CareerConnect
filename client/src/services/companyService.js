import api from './api';

export const companyService = {
  async getAllCompanies(query = '') {
    try {
      const response = await api.get('/companies', { params: { search: query } });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch companies';
    }
  },

  async getCompanyById(id) {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Company not found';
    }
  },

  async getRecruiterCompany() {
    try {
      const response = await api.get('/companies/my-company');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch company profile';
    }
  },

  async createOrUpdateCompany(companyData) {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to save company profile';
    }
  }
};

export default companyService;
