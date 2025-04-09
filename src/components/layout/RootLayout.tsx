import { Toaster } from "../ui/sonner";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col  gap-4 container mx-auto p-2">
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
