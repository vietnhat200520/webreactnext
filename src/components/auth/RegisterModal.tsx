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
    onSwitchToLogin: () => void; // Thêm hàm điều hướng này
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onSwitchToLogin }) => {
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
        if (!formData.username || !formData.password || !formData.fullName || !formData.email || !formData.phone) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        const newUser = {
            username: formData.username,
            password: formData.password,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            provider: "local",
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert("Đăng ký thành công và đã lưu vào hệ thống!");
                
                // Reset form
                setFormData({
                    username: '', password: '', confirmPassword: '',
                    fullName: '', email: '', phone: ''
                });

                // TỰ ĐỘNG CHUYỂN VỀ MÀN HÌNH ĐĂNG NHẬP
                onSwitchToLogin(); 
            } else {
                const errData = await response.json();
                alert("Lỗi: " + errData.message);
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            alert("Không thể kết nối đến máy chủ!");
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
                    <Box>
                        <Typography className="form-column-title">1. Thông tin tài khoản</Typography>
                        <TextField
                            fullWidth
                            name="username"
                            value={formData.username}
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
                            value={formData.password}
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
                            value={formData.confirmPassword}
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

                    <Box>
                        <Typography className="form-column-title">2. Thông tin cá nhân</Typography>
                        <TextField
                            fullWidth
                            name="fullName"
                            value={formData.fullName}
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
                            value={formData.email}
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
                            value={formData.phone}
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
                    Đã có tài khoản? <span className="login-link" onClick={onSwitchToLogin}>Đăng nhập ngay</span>
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterModal;