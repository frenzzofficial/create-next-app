import Background from "@/components/ui/backgrounds/Background";

const DevLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <Background>
      <div className="w-full center">{children}</div>
    </Background>
  );
};

export default DevLayout;
