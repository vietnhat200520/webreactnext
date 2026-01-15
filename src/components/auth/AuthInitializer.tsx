'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import { checkSession } from '@/store/slices/authSlice';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Kiểm tra ngay khi vào app
        dispatch(checkSession());

        // Kiểm tra mỗi phút một lần để tự động logout nếu treo máy quá 60p
        const interval = setInterval(() => {
            dispatch(checkSession());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

    return <>{children}</>;
}