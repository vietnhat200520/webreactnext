"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography } from '@mui/material';
import { RootState, AppDispatch } from '@/store/store';
import { fetchCourseDetail } from '@/store/slices/courseSlice';

// Import các component
import CourseContentList from './CourseContentList';
import CourseTitle from './CourseTitle';
import CourseIntroduction from './CourseIntroduction';
import './CourseStyle.css';

interface Props {
  courseSlug: string; 
}

const CourseDetailView: React.FC<Props> = ({ courseSlug }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, status } = useSelector((state: RootState) => state.course);

  useEffect(() => {
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
        
        <CourseTitle courseName={currentCourse.title} />

        <CourseIntroduction 
          title={currentCourse.title}
          description={`Hey, chào bạn, mình là Admin của OTSV Team. Mình sẽ là người đồng hành cùng bạn trong "${currentCourse.title}" lần này.`}
          points={[
            "Review Nội dung chương trình học, Tài liệu học tập, Cấu trúc và nội dung đề thi giữa kỳ và cuối kỳ mới nhất và Kinh nghiệm của Admin.",
            "Full kiến thức và các dạng bài tập hay gặp theo từng chương",
            "Hệ thống kiến thức và các dạng bài tập hay gặp chương 1: Hàm số một biến",
            "Hệ thống kiến thức và các dạng bài tập hay gặp chương 2: Hàm số nhiều biến",
             "Review Nội dung chương trình học, Tài liệu học tập, Cấu trúc và nội dung đề thi giữa kỳ và cuối kỳ mới nhất và Kinh nghiệm của Admin.",
            "Full kiến thức và các dạng bài tập hay gặp theo từng chương",
            "Hệ thống kiến thức và các dạng bài tập hay gặp chương 1: Hàm số một biến",
            "Hệ thống kiến thức và các dạng bài tập hay gặp chương 2: Hàm số nhiều biến"
          ]}
        />

        {/* Phần 3: Danh sách bài học */}
        <Box display="flex" justifyContent="space-between" mb={2} px={2} mt={4}>
          <Typography variant="button" fontWeight={700} color="textSecondary">
            Tên bài học
          </Typography>
          <Typography variant="button" fontWeight={700} color="textSecondary">
            Tiến độ học
          </Typography>
        </Box>

        <CourseContentList sections={currentCourse.sections} />
      </Container>
    </div>
  );
};

export default CourseDetailView;