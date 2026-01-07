'use client'; // Cần thiết nếu bạn dùng Next.js App Router

import React, { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import './ButtonAuth.css';

/**
 * Interface mở rộng từ ButtonProps của MUI.
 * label: Nội dung chữ hiển thị trên nút.
 */
interface AuthButtonProps extends ButtonProps {
  label: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  onClick, 
  label, 
  className = '', 
  ...rest 
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    
    // Tạo hiệu ứng click trong 200ms
    setTimeout(() => setIsClicked(false), 200);

    // Thực thi hàm onClick truyền từ props nếu có
    if (onClick) {
      onClick(event);
    }
  };

  // Gộp các class: class từ props + class mặc định + class trạng thái click
  const combinedClassName = [
    className,
    'auth-button',
    isClicked ? 'clicked' : ''
  ].filter(Boolean).join(' ');

  return (
    <Button
      onClick={handleClick}
      className={combinedClassName} // Sử dụng className thay vì classes.root để dễ quản lý với CSS ngoài
      {...rest}
    >
      {label}
    </Button>
  );
};

export default AuthButton;