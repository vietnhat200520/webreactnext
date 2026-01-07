'use client';

import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import './SchoolName.css'; 

interface SchoolNameProps {
  schoolId: string | number;
}

const SchoolName: React.FC<SchoolNameProps> = ({ schoolId }) => {
  // Truy xuất dữ liệu từ Redux Store
  const university = useSelector((state: RootState) => 
    state.category.categoriesData.find((item) => item.id === schoolId)
  );

  // Nếu không tìm thấy Id trường, không render gì cả
  if (!university) return null;

  return (
    <Box className="school-name-container">
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Class name phải khớp chính xác với file CSS */}
        <SchoolIcon className="school-icon" />
        <Box>
          <Typography 
            variant="h5" 
            component="h2" 
            className="school-title"
          >
            {university.school}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SchoolName;