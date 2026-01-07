'use client'; // Bắt buộc nếu bạn dùng Next.js App Router

import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Message } from '@mui/icons-material';
import './ButtonChat.css';

/**
 * Định nghĩa Interface cho Props
 * children: Nội dung text bên trong nút (ReactNode cho phép truyền string hoặc icon)
 * link: Đường dẫn URL khi click vào nút
 */
interface ButtonChatProps extends Partial<ButtonProps> {
  children: ReactNode;
  link: string;
}

const ButtonChat: React.FC<ButtonChatProps> = ({ children, link, ...rest }) => {
  return (
    <Button
      // Sử dụng className để áp dụng style từ file .css bên ngoài
      className="button-chat"
      variant="contained"
      // Chuyển đổi Button thành thẻ <a> để hỗ trợ SEO và chuyển trang
      component="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<Message />}
      // Spread các props còn lại từ MUI (như color, size, etc.)
      {...rest}
    >
      {/* Bọc text vào span để xử lý ẩn hiện bằng CSS Media Queries */}
      <span className="chat-text">{children}</span>
    </Button>
  );
};

export default ButtonChat;