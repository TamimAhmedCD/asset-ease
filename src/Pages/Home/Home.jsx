import { Helmet } from "react-helmet-async";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AssetEase | Home</title>
      </Helmet>
      <Navbar />
    </div>
  );
};

export default Home;
