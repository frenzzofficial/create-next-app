interface FooterProps {
  height?: string;
}
const Footer = ({ height = "60px" }: FooterProps) => {
  return (
    <footer
      style={{
        height: height,
        backgroundColor: "var(--accent)",
      }}
    >
      Footer
    </footer>
  );
};

export default Footer;
