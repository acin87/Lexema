import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API } from '../../api/api';
import { AuthTypes } from './AuthActionTypes';

const Register = createAsyncThunk(
    'user/register',
    async (params: { email: string; password: string; name: string }) => {
        try {
            const { data } = await axios.post<AuthTypes>(API.REGISTRATION, {
                email: params.email,
                password: params.password,
                name: params.name,
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);
export default Register;
