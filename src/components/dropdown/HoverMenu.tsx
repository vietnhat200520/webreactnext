
'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material'; 
import { useRouter } from 'next/navigation'; // Chuẩn Next.js App Router
import './HoverMenu.css';

/**
 * Định nghĩa cấu trúc cho từng mục menu
 */
interface HoverMenuItem {
  label: string;
  href: string;
}

/**
 * Interface cho Props của HoverMenu
 */
interface HoverMenuProps {
  items?: HoverMenuItem[];
  buttonLabel?: string;
  baseHref?: string;
}

const HoverMenu: React.FC<HoverMenuProps> = ({ 
  items = [], 
  buttonLabel = "KHOÁ HỌC", 
  baseHref = '#' 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (path: string) => {
    router.push(path); // Next.js navigation
    handleMenuClose();
  };

  return (
    <Box 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      // Hạn chế dùng sx tối đa theo yêu cầu, chỉ giữ lại phần layout cơ bản
      style={{ display: 'inline-block', position: 'relative' }} 
    >
      <Button
        classes={{ root: 'hovermenu-button' }}
        onClick={() => router.push(baseHref)}
      >
        {buttonLabel}
      </Button>
      
      <Menu
        id="hover-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableRestoreFocus
        disableScrollLock
        disableAutoFocusItem
        // Dùng style inline thay cho sx để điều khiển pointerEvents
        style={{ pointerEvents: 'none' }}
        slotProps={{
          paper: { 
            classes: { root: 'hovermenu-paper' },
            style: { pointerEvents: 'auto' } // Cho phép tương tác với menu
          },
          list: { 
            classes: { root: 'hovermenu-list' } 
          }
        }}
      >
        {items.map((item, index) => (
          <MenuItem 
            key={`${item.label}-${index}`} 
            disableRipple
            onClick={() => handleItemClick(item.href)}
            classes={{ root: 'hovermenu-item' }}
          >
            <Typography className="hovermenu-link">
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default HoverMenu;