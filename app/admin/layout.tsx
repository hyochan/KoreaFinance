import { AdminAuthWrapper } from "@/components/layout/AdminAuthWrapper";

// Admin pages should not be prerendered (require auth)
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>;
}
