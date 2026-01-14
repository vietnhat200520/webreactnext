import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    fullName: string;
    email: string;
    avatar?: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

// Khởi tạo trạng thái từ LocalStorage nếu có
const initialState: AuthState = {
    isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('user') : false,
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;