// /app/store/servicesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Типы данных
interface Service {
  id: number;
  service_name: string;
  description: string;
  price: string;
  execution_time: string;
  technologies: string[];
  image: string;
  alt: string;
}

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

// Создание асинхронного действия для получения данных
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services.json`);
  return response.data;
});

// Создание slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export default servicesSlice.reducer;