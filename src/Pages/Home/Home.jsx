import { Helmet } from "react-helmet-async";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import About from "../../Components/About/About";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AssetEase | Home</title>
      </Helmet>
      <Navbar />
      <Hero />
      <About />
    </div>
  );
};

export default Home;
