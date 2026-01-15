'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hook'; // Dùng hook chuẩn đã tạo
import { logout } from '@/store/slices/authSlice';
import { useIsMounted } from '@/hooks/useIsMounted'; // Import hook isMounted
import { 
  AppBar, Toolbar, Box, Typography, Container, Link, 
  IconButton, useMediaQuery, Collapse 
} from '@mui/material';
import NextLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import UserHeaderActions from '../auth/UserHeaderActions'; 
import HoverMenu from '../dropdown/HoverMenu';
import AuthButton from '../button/ButtonAuth';
import './Header.css';

// ... Interfaces giữ nguyên
interface SchoolData { id: string; school: string; href: string; }
interface MenuItemFormat { label: string; href: string; }

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [courseItems, setCourseItems] = useState<MenuItemFormat[]>([]);
  const [modalState, setModalState] = useState<'closed' | 'login' | 'register'>('closed');
  const isDesktop = useMediaQuery('(min-width:1000px)');
  const hideLogoText = useMediaQuery('(max-width:650px)');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/data/school.json');
        const data: SchoolData[] = await response.json();
        const formattedItems = data.map(item => ({ label: item.school, href: item.href }));
        setCourseItems(formattedItems);
      } catch (error) { console.error("Failed to fetch schools:", error); }
    };
    fetchSchools();
  }, []);

  const handleLogout = () => dispatch(logout());

  const MenuContent = ({ isVertical = false }: { isVertical?: boolean }) => (
    <Box className={isVertical ? 'mobile-menu-inner' : ''} sx={{ 
      display: 'flex', 
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: isVertical ? 'flex-start' : 'center'
    }}>
      <Link component={NextLink} href="/" className="nav-link">TRANG CHỦ</Link>
      <HoverMenu items={courseItems} buttonLabel="KHOÁ HỌC" baseHref="/khoa-hoc" />
      <Link component={NextLink} href="/kich-hoat" className="nav-link">KÍCH HOẠT</Link>
      
      {/* Giữ logic Cart: Chỉ hiện khi chưa Auth */}
      {isMounted && !isAuthenticated && (
        <IconButton className="header-cart"><ShoppingCartIcon /></IconButton>
      )}
    </Box>
  );

  return (
    <AppBar position="sticky" classes={{ root: 'custom-appbar' }}>
      <Container maxWidth={false} disableGutters className="header-container">
        <Toolbar classes={{ root: 'header-toolbar' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NextLink href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Flogo-otsv.png&w=128&q=75" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              {!hideLogoText && (
                <Typography sx={{ marginLeft: '8px', color: 'orange', fontWeight: 'bold' }}>
                  Ôn thi nhàn, Kết quả cao
                </Typography>
              )}
            </NextLink>
          </Box>

          {isDesktop ? <MenuContent /> : (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)} className="menu-icon-btn"><MenuIcon /></IconButton>
          )}

          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* QUAN TRỌNG: Chỉ render logic thay đổi theo Auth sau khi isMounted = true */}
            {isMounted && (
              isAuthenticated && user ? (
                <UserHeaderActions user={user} cartCount={0} onLogout={handleLogout} />
              ) : (
                <>
                  <AuthButton label="ĐĂNG NHẬP" onClick={() => setModalState('login')} variant="outlined" />
                  <AuthButton label="ĐĂNG KÝ" onClick={() => setModalState('register')} variant="contained" color="error" />
                </>
              )
            )}
          </Box>
        </Toolbar>
      </Container>

      {!isDesktop && (
        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
          <Box className="mobile-menu-container"><MenuContent isVertical={true} /></Box>
        </Collapse>
      )}

      <LoginModal open={modalState === 'login'} onClose={() => setModalState('closed')} onSwitchToRegister={() => setModalState('register')} />
      <RegisterModal open={modalState === 'register'} onClose={() => setModalState('closed')} onSwitchToLogin={() => setModalState('login')} />
    </AppBar>
  );
};

export default Header;