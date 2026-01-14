"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography } from '@mui/material';
import CourseContentList from './CourseContentList';
import { RootState, AppDispatch } from '@/store/store';
import { fetchCourseDetail } from '@/store/slices/courseSlice';
import './CourseStyle.css';

interface Props {
  courseSlug: string; // Truyền vào từ Next.js dynamic route [slug]
}

const CourseDetailView: React.FC<Props> = ({ courseSlug }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, status } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    // Logic fetch dữ liệu từ public/data/card.json thông qua Redux Thunk
    if (courseSlug) {
      dispatch(fetchCourseDetail(courseSlug));
    }
  }, [courseSlug, dispatch]);

  if (status === 'loading' || !currentCourse) {
    return <Typography align="center">Đang tải dữ liệu khóa học...</Typography>;
  }

  return (
    <div className="course-detail-view">
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" mb={2} px={2}>
          <Typography variant="button" fontWeight={900} color="textSecondary">
            Tên bài học
          </Typography>
          <Typography variant="button" fontWeight={900} color="textSecondary">
            Tiến độ học
          </Typography>
        </Box>

        <CourseContentList sections={currentCourse.sections} />
      </Container>
    </div>
  );
};

export default CourseDetailView;