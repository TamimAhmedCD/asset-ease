import { useKeenSlider } from "keen-slider/react";
import Lottie from "lottie-react";
import hero1 from "./hero1.json";
import { Button } from "@mui/material";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const Hero = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      {/* slider */}
      <div ref={sliderRef} className="keen-slider">
        {/* slider 1 */}
        <div className="keen-slider__slide number-slide1">
          {/* slider 1 content */}
          <div className="flex justify-between items-center gap-5 mt-10">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-[#1753c2]">
                Empowering Employees with Seamless Asset Access
              </h1>
              <p>
                Stay productive and organized with AssetEase. Easily request,
                track, and manage company-provided assets, ensuring a
                hassle-free experience for every employee.
              </p>
              <Link to="/employee-register">
                <Button
                  variant="contained"
                  className="normal-case bg-[#1753c2]"
                >
                  Join as Employee
                </Button>
              </Link>
            </div>
            <Lottie animationData={hero1} className="w-4/6" />
          </div>
        </div>
        {/* slider 2 */}
        <div className="keen-slider__slide number-slide2">
          {/* slider 2 content */}
          <div className="flex justify-between items-center gap-5 mt-10">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-[#1753c2]">
                Smart Asset Management for HR Excellence
              </h1>
              <p>
                AssetEase simplifies asset tracking and allocation for HR
                managers. Efficiently manage returnable and non-returnable
                items, streamline processes, and keep your workforce organized
                with ease.
              </p>
              <Link to="/hr-register">
                <Button
                  variant="contained"
                  className="normal-case bg-[#1753c2]"
                >
                  Join as HR Manager
                </Button>
              </Link>
            </div>
            <Lottie animationData={hero1} className="w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
