// src/app/course/[slug]/page.tsx
import CourseDetailView from '@/components/course/CourseDetailView';

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
      {/* Truyền slug đã giải nén vào component */}
      <CourseDetailView courseSlug={slug} />
    </main>
  );
}