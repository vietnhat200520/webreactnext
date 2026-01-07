'use client';

import React, { useState, useEffect, KeyboardEvent } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// Import interface từ file CourseCard bạn đã tạo trước đó
import { Course } from "../card/Card";
import './Search.css';

/**
 * Interface cho Props của Search component
 */
interface SearchProps {
  courses?: Course[];
  query?: string;
  onQueryChange?: (newQuery: string) => void;
  onResults?: (filteredCourses: Course[]) => void;
}

const Search: React.FC<SearchProps> = ({
  courses = [],
  query = "",
  onQueryChange,
  onResults,
}) => {
  // Quản lý giá trị nhập tạm thời tại local component
  const [localQuery, setLocalQuery] = useState<string>(query);

  // Đồng bộ localQuery khi prop query từ cha thay đổi
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  /**
   * Hàm thực hiện lọc dữ liệu
   */
  const handleSearch = (): void => {
    const q = localQuery.trim().toLowerCase();
    
    // Thực hiện lọc dựa trên tiêu đề khóa học
    const filtered = q
      ? courses.filter((c) => c.title.toLowerCase().includes(q))
      : courses;

    // Gửi giá trị query và kết quả lọc về cho component cha hoặc Redux
    onQueryChange?.(localQuery);
    onResults?.(filtered);
  };

  /**
   * Xử lý khi người dùng nhấn phím Enter
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      // Sử dụng classes.root để áp dụng class từ file CSS theo đúng yêu cầu của bạn
      classes={{ root: 'search-field' }}
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Tìm kiếm khoá học..."
      variant="outlined"
      fullWidth
      // Cấu hình icon ở cuối ô nhập liệu
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Tìm kiếm"
              onClick={handleSearch}
              edge="end"
              size="small"
            >
              <SearchIcon style={{ color: "#9aa0a6" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Search;