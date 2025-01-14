import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="lg:w-10/12 mx-auto w-11/12">
      <Outlet />
    </div>
  );
};

export default MainLayout;
