"use client";
import ThemeProvider from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = ({ children }: Readonly<AppClientLayoutProps>) => {
  return (
    <ThemeProvider>
      <Header sticky={true} />
      <main className="min-h-screen w-full center flex-col">{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default AppClientLayout;
