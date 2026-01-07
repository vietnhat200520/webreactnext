'use client';

import React from "react";
import { Box, Typography } from "@mui/material";
import './Card.css';


export interface Course {
  id: string | number;
  image: string;
  title: string;
  description: string;
  rating: number | string;
  price: string;
}

interface CourseCardProps {
  course: Course;
}

const Card: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Box className="course-card">
      {/* Ảnh và badge */}
      <Box className="card-image">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="course-img-element"
          />
        )}
      </Box>

      {/* Thông tin khóa học */}
      <Box className="card-info">
        <Typography
          variant="h6"
          component="h4"
          className="card-title"
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          className="card-description"
        >
          {course.description}
        </Typography>

        <Box className="card-footer">
          <Typography variant="body2" className="footer-text">
            {course.rating} Đánh giá
          </Typography>
          <Typography variant="body2" className="footer-text price">
            {course.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;