interface HeaderProps {
  height?: string;
  sticky?: boolean;
}

const Header = ({ height = "60px", sticky }: HeaderProps) => {
  return (
    <header
      style={{
        height: height,
        backgroundColor: "var(--accent)",
        position: sticky ? "sticky" : "static",
        top: sticky ? 0 : undefined,
      }}
      className="header"
    >
      Header
    </header>
  );
};

export default Header;
