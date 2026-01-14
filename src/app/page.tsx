'use client';

import React, { useState, useEffect } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import CardListcourse from "@/components/card/CardListcourse";
import Search from "../components/search/Search";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Banner from "@/components/banner/Banner";
import ButtonChat from "@/components/button/ButtonChat";
import './HomePage.css';

// Import các Interface đã định nghĩa
import { Course } from "../components/card/Card";

interface Category {
  id: string;
  school: string;
  branch: string[];
  image: string;
}

interface BannerSlide {
  id: number | string;
  link: string;
  alt: string;
}

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch API song song để tối ưu tốc độ
        const [courseRes, schoolRes, bannerRes] = await Promise.all([
          fetch('/data/card.json'),
          fetch('/data/school.json'),
          fetch('/data/banner.json')
        ]);

        const [courseData, schoolData, bannerData] = await Promise.all([
          courseRes.json(),
          schoolRes.json(),
          bannerRes.json()
        ]);

        setCourses(courseData);
        setFiltered(courseData);
        setCategories(schoolData);
        setBanners(bannerData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box className="homepage-root">
        {/* Banner */}
        {banners.length > 0 && <Banner slidesData={banners} />}

        <Container classes={{ root: 'mainContainer' }}>
          {/* Bên trái: Sidebar */}
          <Box className="sidebarWrapper">
            <Sidebar categories={categories} />
          </Box>

          {/* Bên phải: Content */}
          <Box className="contentWrapper">
            <Box className="headerSection">
              <h2 className="title">
                Tất cả khóa học <span className="count">({filtered.length} Khóa học)</span>
              </h2>
              <Box className="searchBox">
                <Search
                  courses={courses}
                  query={query}
                  onQueryChange={setQuery}
                  onResults={setFiltered}
                />
              </Box>
            </Box>

            <CardListcourse courses={filtered} />
          </Box>

          <ButtonChat link="#">
            Nhắn tin cho ôn thi sinh viên
          </ButtonChat>
        </Container>

        <Footer />
      </Box>
    </Box>
  );
}