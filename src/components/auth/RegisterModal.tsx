'use client';

import React, { useState } from 'react';
import { 
    Dialog, DialogContent, DialogTitle, IconButton, 
    Typography, TextField, Button, Box, InputAdornment 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import './RegisterModal.css';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
    // State quản lý dữ liệu nhập vào
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        const newUser = {
            id: Date.now(), // Tạo ID tạm thời
            username: formData.username,
            password: formData.password,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            provider: "local",
            createdAt: new Date().toISOString()
        };

        console.log("Dữ liệu chuẩn bị lưu vào user.json:", newUser);

        // Giả lập gọi API route để ghi file user.json (Next.js Server Side)
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert("Đăng ký thành công!");
                onClose();
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            // Trong môi trường demo, chúng ta vẫn log ra dữ liệu
            alert("Tính năng ghi file cần API Route. Kiểm tra Console để xem dữ liệu JSON.");
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            classes={{ paper: 'register-modal-paper' }}
        >
            <IconButton className="close-icon-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>

            <DialogTitle className="register-title-container">
                <Typography variant="h5" fontWeight="700">Đăng ký</Typography>
            </DialogTitle>

            <DialogContent>
                <Box className="register-form-container">
                    {/* Cột 1: Thông tin tài khoản */}
                    <Box>
                        <Typography className="form-column-title">1. Thông tin tài khoản</Typography>
                        <TextField
                            fullWidth
                            name="username"
                            placeholder="Tài khoản đăng nhập*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="password"
                            type="password"
                            placeholder="Mật khẩu*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="confirmPassword"
                            type="password"
                            placeholder="Xác nhận mật khẩu*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                            }}
                        />
                    </Box>

                    {/* Cột 2: Thông tin cá nhân */}
                    <Box>
                        <Typography className="form-column-title">2. Thông tin cá nhân</Typography>
                        <TextField
                            fullWidth
                            name="fullName"
                            placeholder="Họ và tên*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="email"
                            placeholder="Email*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><MailOutlineIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="phone"
                            placeholder="Số điện thoại*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LocalPhoneOutlinedIcon /></InputAdornment>,
                            }}
                        />
                    </Box>
                </Box>

                <Button 
                    fullWidth 
                    className="register-submit-btn"
                    onClick={handleRegister}
                >
                    Đăng ký
                </Button>

                <Box className="divider-container">
                    <div className="divider-line" />
                    <span className="divider-text">HOẶC</span>
                    <div className="divider-line" />
                </Box>

                <Button fullWidth className="google-login-btn">
                    <img 
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                        alt="google" 
                        style={{ width: 18, marginRight: 10 }} 
                    />
                    Đăng nhập với Google
                </Button>

                <Typography className="login-redirect-text">
                    Đã có tài khoản? <span className="login-link">Đăng nhập ngay</span>
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterModal;