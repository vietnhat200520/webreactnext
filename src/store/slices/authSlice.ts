import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    expiresAt: number | null; // Thêm dòng này để lưu mốc hết hạn
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    expiresAt: null, // Mặc định là null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            // Lưu mốc: Thời gian hiện tại + 60 phút
            state.expiresAt = Date.now() + 60 * 60 * 1000; 
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.expiresAt = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },
        
        checkSession: (state) => {
            if (state.expiresAt && Date.now() > state.expiresAt) {
                state.isAuthenticated = false;
                state.user = null;
                state.expiresAt = null;
            }
        }
    },
});

export const { loginSuccess, logout, checkSession } = authSlice.actions;
export default authSlice.reducer;