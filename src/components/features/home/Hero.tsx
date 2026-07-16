import heroImage from "@/assets/images/hero-01.png";
import Background from "@/components/ui/backgrounds/Background";

const Hero = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "70vh",
      }}
    >
      <Background variant="image" image={heroImage.src}>
        <h1
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "3rem",
            fontWeight: 700,
          }}
        >
          Hero
        </h1>
      </Background>
    </section>
  );
};

export default Hero;
