'use client';

import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import Link from 'next/link'; // Sử dụng Link để điều hướng trang
import './Card.css';

// Interface chuẩn khớp với file card.json mới
export interface Course {
  id: string | number;
  slug: string; // Định danh trên URL
  image: string;
  title: string;
  description: string;
  rating: number;
  price: string;
  school: string;
  branch: string;
  color?: string; // Màu sắc chủ đạo của khóa học
}

interface CourseCardProps {
  course: Course;
}

const Card: React.FC<CourseCardProps> = ({ course }) => {
  return (
    // Bọc toàn bộ Card bằng Link để khi click sẽ trỏ đến trang giới thiệu
    <Link href={`/course/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box className="course-card">
        {/* Phần ảnh nền khóa học */}
        <Box className="card-image-wrapper">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="course-img-element"
            />
          ) : (
            // Hiển thị box màu nếu không có ảnh (giống các card cuối trong ảnh mẫu)
            <Box className="placeholder-image" style={{ backgroundColor: course.color || '#ccc' }}>
                <Typography variant="caption" color="white" fontWeight={700}>
                    {course.school.toUpperCase()}
                </Typography>
            </Box>
          )}
        </Box>

        {/* Phần thông tin nội dung */}
        <Box className="card-info">
          <Typography variant="subtitle1" component="h4" className="card-title">
            {course.title}
          </Typography>

          <Typography variant="body2" className="card-description">
            {course.description}
          </Typography>

          {/* Phần đánh giá và giá tiền ở cuối card */}
          <Box className="card-footer">
            <Box display="flex" alignItems="center">
               <Rating value={5} readOnly size="small" sx={{ fontSize: '14px', mr: 0.5 }} />
               <Typography variant="caption" color="textSecondary">
                 ({course.rating} Đánh giá)
               </Typography>
            </Box>
            
            <Typography variant="subtitle2" className="price-tag">
              {course.price}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;