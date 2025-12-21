import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "대한금융",
  description: "신뢰와 혁신으로 고객의 미래를 함께 설계합니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
