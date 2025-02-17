import { Helmet } from "react-helmet-async";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import About from "../../Components/About/About";
import Packages from "../../Components/Packages/Packages";
import Footer from "../../Components/Footer/Footer";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Features from "../../Components/Features/Features";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AssetEase | Home</title>
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <Packages />
      <Testimonials />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
