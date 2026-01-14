// src/app/course/[slug]/page.tsx
import CourseDetailView from '@/components/course/CourseDetailView';
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: PageProps) {
  // Giải nén params bằng await trước khi sử dụng
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <main>
      <Header />
     
      <CourseDetailView courseSlug={slug} />
      <Footer />
    </main>
  );
}