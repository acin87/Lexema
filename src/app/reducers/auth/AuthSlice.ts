import { createSlice } from '@reduxjs/toolkit';
import Login from '../../actions/auth/Login';
import Register from '../../actions/auth/Register';
import { loadState } from '../../util/LocalStorage';
import { AuthPersistentState, AuthSliceState } from './AuthSliceTypes';

export const JWT_PERSISTENT_STATE = 'userData';

const initialState: AuthSliceState = {
    jwt: loadState<AuthPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMsg = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErrorMsg = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.accessToken;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.loginErrorMsg = action.error.message;
        });
        builder.addCase(Register.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.accessToken;
        });
        builder.addCase(Register.rejected, (state, action) => {
            state.registerErrorMsg = action.error.message;
        });
    },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
