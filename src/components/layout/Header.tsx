'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Thêm Redux hooks
import { RootState } from '@/store/store'; // Đảm bảo đường dẫn store đúng
import { logout } from '@/store/slices/authSlice'; // Thêm action logout
import { 
  AppBar, Toolbar, Box, Typography, Container, Link, 
  IconButton, useMediaQuery, Collapse 
} from '@mui/material';
import NextLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import UserHeaderActions from '../auth/UserHeaderActions'; // Thêm component này
import HoverMenu from '../dropdown/HoverMenu';
import AuthButton from '../button/ButtonAuth';
import './Header.css';

interface SchoolData {
  id: string;
  school: string;
  href: string;
}

interface MenuItemFormat {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const dispatch = useDispatch();
  // Lấy trạng thái từ Redux
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [courseItems, setCourseItems] = useState<MenuItemFormat[]>([]);
  const [modalState, setModalState] = useState<'closed' | 'login' | 'register'>('closed');
  const isDesktop = useMediaQuery('(min-width:1000px)');
  const hideLogoText = useMediaQuery('(max-width:650px)');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/data/school.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data: SchoolData[] = await response.json();
        const formattedItems = data.map(item => ({
          label: item.school,
          href: item.href
        }));
        setCourseItems(formattedItems);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      }
    };
    fetchSchools();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const MenuContent = ({ isVertical = false }: { isVertical?: boolean }) => (
    <Box className={isVertical ? 'mobile-menu-inner' : ''} style={{ 
      display: 'flex', 
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: isVertical ? 'flex-start' : 'center'
    }}>
      <Link component={NextLink} href="/" className="nav-link">TRANG CHỦ</Link>
      <HoverMenu 
        items={courseItems} 
        buttonLabel="KHOÁ HỌC" 
        baseHref="/khoa-hoc" 
      />
      <Link component={NextLink} href="/kich-hoat" className="nav-link">KÍCH HOẠT</Link>
      
      {/* Chỉ hiện giỏ hàng chung nếu chưa đăng nhập, 
          đăng nhập rồi thì giỏ hàng nằm trong UserHeaderActions */}
      {!isLoggedIn && (
        <IconButton className="header-cart">
          <ShoppingCartIcon />
        </IconButton>
      )}
    </Box>
  );

  return (
    <AppBar position="sticky" classes={{ root: 'custom-appbar' }}>
      <Container maxWidth={false} disableGutters className="header-container">
        <Toolbar classes={{ root: 'header-toolbar' }}>
          
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <NextLink href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Flogo-otsv.png&w=128&q=75"
                alt="Logo"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              {!hideLogoText && (
                <Typography style={{ marginLeft: '8px', color: 'orange', fontWeight: 'bold' }}>
                  Ôn thi nhàn, Kết quả cao
                </Typography>
              )}
            </NextLink>
          </Box>

          {isDesktop ? <MenuContent /> : (
            <IconButton onClick={handleDrawerToggle} className="menu-icon-btn">
              <MenuIcon />
            </IconButton>
          )}

          {/* KHU VỰC THAY ĐỔI THEO TRẠNG THÁI ĐĂNG NHẬP */}
          <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {isLoggedIn && user ? (
              <UserHeaderActions 
                user={user} 
                cartCount={0} 
                onLogout={handleLogout} 
              />
            ) : (
              <>
                <AuthButton label="ĐĂNG NHẬP" onClick={() => setModalState('login')} variant="outlined" />
                <AuthButton label="ĐĂNG KÝ" onClick={() => setModalState('register')} variant="contained" color="error" />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* MOBILE MENU */}
      {!isDesktop && (
        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
          <Box className="mobile-menu-container">
            <MenuContent isVertical={true} />
          </Box>
        </Collapse>
      )}

      {/* MODALS */}
      <LoginModal 
        open={modalState === 'login'} 
        onClose={() => setModalState('closed')}
        onSwitchToRegister={() => setModalState('register')} 
      />

      <RegisterModal 
        open={modalState === 'register'} 
        onClose={() => setModalState('closed')}
        onSwitchToLogin={() => setModalState('login')}
      />
    </AppBar>
  );
};

export default Header;