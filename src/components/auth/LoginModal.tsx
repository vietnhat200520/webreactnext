'use client';

import React, { useState } from 'react';
import { 
    Dialog, DialogContent, DialogTitle, IconButton, 
    Typography, TextField, Button, Box, InputAdornment 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginModal.css';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onSwitchToRegister?: () => void; // Hàm để chuyển sang Modal Đăng ký
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSwitchToRegister }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        console.log("Thực hiện đăng nhập với:", credentials);
        // Logic xử lý đăng nhập (dispatch Redux action...) sẽ nằm ở đây
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="xs" 
            fullWidth
            classes={{ paper: 'login-modal-paper' }}
        >
            <IconButton className="close-icon-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>

            <DialogTitle className="login-title-container">
                <Typography variant="h5" fontWeight="700">Đăng nhập</Typography>
            </DialogTitle>

            <DialogContent>
                <Box component="form" className="login-form-body">
                    <TextField
                        fullWidth
                        name="username"
                        placeholder="Tài khoản đăng nhập"
                        className="login-input-field"
                        margin="normal"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        name="password"
                        type="password"
                        placeholder="Mật khẩu"
                        className="login-input-field"
                        margin="normal"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography className="forgot-password-link">
                        Quên mật khẩu
                    </Typography>

                    <Button 
                        className="login-submit-btn"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </Button>

                    <Box className="divider-container">
                        <div className="divider-line" />
                        <span className="divider-text">HOẶC</span>
                        <div className="divider-line" />
                    </Box>

                    <Button className="google-login-btn">
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="google" 
                            style={{ width: 18, marginRight: 10 }} 
                        />
                        Đăng nhập với Google
                    </Button>

                    <Typography className="register-redirect-text">
                        Không có tài khoản? <span className="register-link" onClick={onSwitchToRegister}>Đăng ký ngay</span>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;