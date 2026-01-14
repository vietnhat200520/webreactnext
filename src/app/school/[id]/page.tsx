'use client';

import React, { useState, useEffect } from 'react'; // Đã thêm useState, useEffect
import { 
  Container, 
  Box, 
  CircularProgress, 
  Typography 
} from '@mui/material'; // Đã thêm các component thiếu

import SchoolName from '@/components/common/SchoolName';
import ButtonAuth from '@/components/button/ButtonAuth';
import ButtonChat from '@/components/button/ButtonChat';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Banner from '@/components/banner/Banner';

import { useParams } from 'next/navigation';

interface SlideItem {
  id: number | string;
  link: string;
  alt: string;
}

const SchoolPage = () => {
  const params = useParams();
  const schoolId = params.id as string;

  const [banners, setBanners] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBanners = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/banner.json');
        
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu banner');
        }

        const data = await response.json();
        setBanners(data);
      } catch (err: any) {
        console.error("Lỗi fetch banner:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBanners();
  }, []);

  // Trạng thái Loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  // Trạng thái Lỗi
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography color="error">Đã xảy ra lỗi: {error}</Typography>
      </Box>
    );
  } // <-- Đã thêm dấu đóng ngoặc ở đây

  return (
    <>
      <Header />
      
      {/* Banner thường nằm full-width phía dưới Header */}
      {banners.length > 0 && <Banner slidesData={banners} />}

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          {/* Kết hợp component SchoolName vào trang */}
          <SchoolName schoolId={schoolId} />

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <ButtonAuth
              label="Đăng ký"
              variant="contained"
              onClick={() => console.log(`Đăng ký cho trường: ${schoolId}`)}
            />
            <ButtonAuth
              label="Đăng nhập"
              variant="outlined"
              onClick={() => console.log(`Đăng nhập cho trường: ${schoolId}`)}
            />
          </Box>

          {/* Nội dung khóa học sẽ render ở đây */}
          
          <ButtonChat link="https://chat.example.com">
            Chat với ôn thi sinh viên 
          </ButtonChat>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default SchoolPage;