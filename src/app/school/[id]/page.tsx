'use client';

import React from 'react';
import { Container, Box } from '@mui/material';
import SchoolName from '@/components/common/SchoolName';
import ButtonAuth from '@/components/button/ButtonAuth';
import ButtonChat from '@/components/button/ButtonChat';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useParams } from 'next/navigation'; // Hook lấy params trên URL

const SchoolPage = () => {
  const params = useParams();
  const schoolId = params.id as string; // Lấy 'neu' hoặc 'xaydung' từ URL

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Header/>
        {/* Kết hợp component SchoolName vào trang */}
        <SchoolName schoolId={schoolId} />

        <ButtonAuth
          label="Đăng ký"
          variant="contained"
          color="primary"
          onClick={() => {
            console.log(`Đăng ký cho trường có ID: ${schoolId}`);
          }}
          sx={{ mt: 2 }}
        />
        <ButtonAuth
          label="Đăng nhập"
          variant="contained"
          color="primary"
          onClick={() => {
            console.log(`Đăng nhập cho trường có ID: ${schoolId}`);
          }}
          sx={{ mt: 2 }}
        />
        <ButtonChat
          link="https://chat.example.com"
          sx={{ mt: 2, ml: 2 }}
        >
          Chat với ôn thi sinh viên 
        </ButtonChat>
        <Footer />

        {/* Các component khác như danh sách khóa học của trường đó sẽ nằm ở đây */}
      </Box>
    </Container>
  );
};

export default SchoolPage;