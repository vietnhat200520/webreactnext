'use client';

import React, { useState, ChangeEvent } from "react";
import { Pagination, Box } from "@mui/material";
// Import interface từ file CourseCard hoặc định nghĩa tại đây
import CourseCard, { Course } from "./Card";
import './CardListcourse.css';

/**
 * Interface cho Props của CourseList
 */
interface CourseListProps {
  courses: Course[];
}

const CARDS_PER_PAGE = 9;

const CardListcourse: React.FC<CourseListProps> = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tính toán toán học cho phân trang
  const totalCourses = courses.length;
  const totalPages = Math.ceil(totalCourses / CARDS_PER_PAGE);
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;

  // Cắt mảng dữ liệu dựa trên trang hiện tại
  const currentCards = courses.slice(indexOfFirstCard, indexOfLastCard);

  /**
   * Xử lý thay đổi trang
   * @param event - Sự kiện thay đổi của React
   * @param value - Giá trị trang mới
   */
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // Cuộn lên đầu trang mượt mà khi đổi trang
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box className="course-list-container">
      <Box className="course-grid">
        {currentCards.map((course) => (
          <div key={course.id} className="grid-item">
            <CourseCard course={course} />
          </div>
        ))}
      </Box>

      {/* PHẦN PHÂN TRANG */}
      {totalCourses > CARDS_PER_PAGE && (
        <div className="pagination-wrapper">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
          />
        </div>
      )}
    </Box>
  );
};

export default CardListcourse;