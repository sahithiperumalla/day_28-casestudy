import axios from 'axios';

const API_URL = 'http://localhost:5005';

export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserByEmailAndPassword = (email, password) =>
  axios.get(`${API_URL}/users?email=${email}&password=${password}`);

export const addUser = (user) => axios.post(`${API_URL}/users`, user);

export const getTurfs = () => axios.get(`${API_URL}/turfs`);
export const addTurf = (turf) => axios.post(`${API_URL}/turfs`, turf);
export const updateTurf = (id, turf) => axios.put(`${API_URL}/turfs/${id}`, turf);
export const deleteTurf = (id) => axios.delete(`${API_URL}/turfs/${id}`);

export const getCart = () => axios.get(`${API_URL}/cart`);
export const addToCart = (item) => axios.post(`${API_URL}/cart`, item);
export const updateCartItem = (id, item) => axios.put(`${API_URL}/cart/${id}`, item);
export const deleteCartItem = (id) => axios.delete(`${API_URL}/cart/${id}`);

export const getBookings = () => axios.get(`${API_URL}/bookings`);
export const addBooking = (booking) => axios.post(`${API_URL}/bookings`, booking);
