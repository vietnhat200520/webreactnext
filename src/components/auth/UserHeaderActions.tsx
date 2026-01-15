'use client';

import React, { useState } from 'react';
import { 
    Box, IconButton, Badge, Avatar, Menu, 
    MenuItem, Typography, Divider 
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAppSelector } from '@/store/hook';
import './UserHeaderActions.css';

interface UserHeaderActionsProps {
    user: { fullName: string; email: string; avatar?: string; };
    notificationCount?: number;
    cartCount?: number;
    onLogout?: () => void;
}

const UserHeaderActions: React.FC<UserHeaderActionsProps> = ({ 
    user, 
    notificationCount = 0, 
    cartCount = 0,
    onLogout 
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMounted = useIsMounted();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    // GUARD: Nếu chưa mounted hoặc chưa auth thì không render gì cả
    // Điều này cực kỳ quan trọng để tránh lỗi Hydration vì Server render nút Login
    if (!isMounted || !isAuthenticated) return null;

    return (
        <Box className="header-actions-wrapper" sx={{ display: 'flex', alignItems: 'center' }}>
            
            <IconButton className="header-icon-btn">
                <Badge badgeContent={cartCount} color="error" className="custom-badge">
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            <IconButton className="header-icon-btn">
                <Badge badgeContent={notificationCount} color="error" className="custom-badge">
                    <NotificationsNoneOutlinedIcon />
                </Badge>
            </IconButton>

            <Box className="user-profile-trigger" onClick={handleOpenMenu} sx={{ cursor: 'pointer', ml: 1 }}>
                <Avatar src={user.avatar} alt={user.fullName} className="header-user-avatar">
                    {user.fullName.charAt(0).toUpperCase()}
                </Avatar>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                className="user-dropdown-menu"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box className="menu-user-info-header" sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'primary.main' }}>
                    <Avatar src={user.avatar} className="large-menu-avatar" />
                    <Box ml={2}>
                        <Typography variant="subtitle1" fontWeight={700} color="white">{user.fullName}</Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.8)">{user.email}</Typography>
                    </Box>
                </Box>
                
                <MenuItem onClick={handleCloseMenu} className="dropdown-item">LỊCH SỬ GIAO DỊCH</MenuItem>
                <Divider className="menu-divider" />
                <MenuItem onClick={handleCloseMenu} className="dropdown-item">KHOÁ HỌC CỦA TÔI</MenuItem>
                <Divider className="menu-divider" />
                
                <MenuItem 
                    onClick={() => { handleCloseMenu(); onLogout?.(); }} 
                    className="dropdown-item logout-text"
                    sx={{ color: 'error.main' }}
                >
                    ĐĂNG XUẤT
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserHeaderActions;