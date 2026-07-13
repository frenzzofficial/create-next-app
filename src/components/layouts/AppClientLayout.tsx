"use client";
import "../../styles/ui.css";
import ThemeProvider from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = ({ children }: Readonly<AppClientLayoutProps>) => {
  return (
    <ThemeProvider>
      <Header />
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default AppClientLayout;
