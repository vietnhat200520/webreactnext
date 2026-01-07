'use client';

import React from 'react';
import { Container, Box } from '@mui/material';
import SchoolName from '@/components/common/SchoolName';
import { useParams } from 'next/navigation'; // Hook lấy params trên URL

const SchoolPage = () => {
  const params = useParams();
  const schoolId = params.id as string; // Lấy 'neu' hoặc 'xaydung' từ URL

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Kết hợp component SchoolName vào trang */}
        <SchoolName schoolId={schoolId} />
        
        {/* Các component khác như danh sách khóa học của trường đó sẽ nằm ở đây */}
      </Box>
    </Container>
  );
};

export default SchoolPage;