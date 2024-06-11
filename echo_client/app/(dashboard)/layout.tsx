import { Toaster } from "@/components/toast/toaster";
import { NavPanel } from "@/features/user/ui/NavPanel";
import { DashboardHeader } from "@/widgets/dashboard-header/ui";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NavPanel />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <main className="grid container flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
}
