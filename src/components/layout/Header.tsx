'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Box, Typography, Container, Link, 
  IconButton, useMediaQuery, Collapse 
} from '@mui/material';
import NextLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import HoverMenu from '../dropdown/HoverMenu';
import AuthButton from '../button/ButtonAuth';
import './Header.css';

// Interface cho dữ liệu từ file school.json
interface SchoolData {
  id: string;
  school: string;
  href: string;
}

// Interface cho định dạng HoverMenu yêu cầu
interface MenuItemFormat {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [courseItems, setCourseItems] = useState<MenuItemFormat[]>([]);
  const [modalState, setModalState] = useState<'closed' | 'login' | 'register'>('closed');
  const isDesktop = useMediaQuery('(min-width:1000px)');
  const hideLogoText = useMediaQuery('(max-width:650px)');
  const [openRegister, setOpenRegister] = useState(false);
  // Fetch API lấy data từ public/data/schools.json
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/data/school.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data: SchoolData[] = await response.json();
        
        // Chuyển đổi dữ liệu sang format cho HoverMenu
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

  // Nội dung Menu
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
      
      <IconButton className="header-cart">
        <ShoppingCartIcon />
      </IconButton>
    </Box>
  );

  return (
    <AppBar position="sticky" classes={{ root: 'custom-appbar' }}>
      <Container maxWidth={false} disableGutters className="header-container">
        <Toolbar classes={{ root: 'header-toolbar' }}>
          
          {/* 1. LOGO */}
          <Box style={{ display: 'flex', alignItems: 'center' }}>
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
          </Box>

          {/* 2. MENU */}
          {isDesktop ? (
            <MenuContent />
          ) : (
            <IconButton onClick={handleDrawerToggle} className="menu-icon-btn">
              <MenuIcon />
            </IconButton>
          )}

          {/* 3. AUTH */}
          <Box style={{ display: 'flex', gap: '8px' }}>
            <AuthButton label="ĐĂNG NHẬP" onClick={() => setModalState('login')} variant="outlined" />
            <AuthButton label="ĐĂNG KÝ" onClick={() =>  setModalState('register')} variant="contained" color="error" />
             
<LoginModal 
    open={modalState === 'login'} 
    onClose={() => setModalState('closed')}
    onSwitchToRegister={() => setModalState('register')} 
/>

<RegisterModal 
    open={modalState === 'register'} 
    onClose={() => setModalState('closed')} 
/>
          </Box>

        </Toolbar>
      </Container>

      {/* 4. MOBILE MENU */}
      {!isDesktop && (
        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
          <Box className="mobile-menu-container">
            <MenuContent isVertical={true} />
          </Box>
        </Collapse>
      )}
    </AppBar>
  );
};

export default Header;