import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';

interface Props {
  courseName: string;
}

const CourseTitle: React.FC<Props> = ({ courseName }) => {
  return (
    <Box py={2}>
      
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        className="course-breadcrumbs"
      >
        <Link component={NextLink} href="/" underline="hover" color="inherit">
          Trang chủ
        </Link>
        <Link component={NextLink} href="/danh-muc" underline="hover" color="inherit">
          Danh mục khoá học
        </Link>
        <Typography color="primary" fontWeight={700}>
          {courseName.toUpperCase()}
        </Typography>
      </Breadcrumbs>

  
      <Typography variant="h5" fontWeight={700} color="primary" sx={{ mt: 3, mb: 1 }}>
        {courseName.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default CourseTitle;