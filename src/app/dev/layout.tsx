const DevLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  if (process.env.NODE_ENV === "production") return null;
  return <>{children}</>;
};

export default DevLayout;
