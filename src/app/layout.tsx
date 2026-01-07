import ReduxProvider from "@/store/ReduxProvider";
// Đảm bảo bạn cũng đã có ThemeRegistry cho MUI
import ThemeRegistry from "@/components/ThemeRegistry"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {/* Bước quan trọng nhất: Bọc ReduxProvider ngoài cùng */}
        <ReduxProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}