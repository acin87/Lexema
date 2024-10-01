import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API } from '../../api/api';
import { AuthTypes } from '../../types/AuthTypes';

const Login = createAsyncThunk('LX/login', async (params: { email: string; password: string }) => {
    try {
        const { data } = await axios.post<AuthTypes>(API.LOGIN, {
            email: params.email,
            password: params.password,
        });
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message);
        }
    }
});
export default Login;
