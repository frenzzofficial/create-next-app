import Features from "./Features";
import Hero from "./Hero";

const HomePage = () => {
  return (
    <div className="w-full flex min-h-screen flex-col items-center gap-2 pt-12 pb-12 sm:pt-16 md:pt-20">
      <Hero />
      <Features />
    </div>
  );
};

export default HomePage;
