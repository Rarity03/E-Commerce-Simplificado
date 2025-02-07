import axios from './axios'

export const getProductsRequest = (filters) => {
    const params = new URLSearchParams();

    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.category) params.append('category', filters.category);
    if (filters.name) params.append('name', filters.name);
    if (filters.state) params.append('state', filters.state);

    return axios.get(`/products?${params.toString()}`);
};

export const getProductRequest = id => axios.get(`/products/${id}`)

