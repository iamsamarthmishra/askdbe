import { Sidebar } from "@/components/layout/sidebar";
import { DashboardWrapper } from "./dashboard-wrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-[#0A0A0A] text-[#FFFFFF] font-sans antialiased selection:bg-[#00FF94] selection:text-black">
      {/* Left Sidebar (Fixed & Minimal) */}
      <Sidebar />

      {/* Center Main Content & Right Panel handled by Client Wrapper */}
      <DashboardWrapper>
        {children}
      </DashboardWrapper>
    </div>
  );
}
