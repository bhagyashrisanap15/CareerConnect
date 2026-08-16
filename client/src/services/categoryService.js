import api from './api';

export const categoryService = {
  async getCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch categories';
    }
  },

  async addCategory(name) {
    try {
      const response = await api.post('/categories', { name });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add category';
    }
  },

  async updateCategory(id, name) {
    try {
      const response = await api.put(`/categories/${id}`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update category';
    }
  },

  async deleteCategory(id) {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete category';
    }
  }
};

export default categoryService;
