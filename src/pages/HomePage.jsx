import HeroSection from "../components/HeroSection";
import StatDashboard from "../components/StatDashboard";
import useTitle from "../utilities/useTitle";
import LazyLoad from "react-lazy-load";
import EmployeeDetails from "./HR_staff_management/EmployeeDetails/EmployeeDetails";
import FAQSection from "../components/FAQSection";

const HomePage = () => {
  useTitle();

  return (
    <div className="container mx-auto">
      <LazyLoad>
        <HeroSection></HeroSection>
      </LazyLoad>
      <LazyLoad>
        <StatDashboard></StatDashboard>
      </LazyLoad>
      <LazyLoad className="mb-28">
        <EmployeeDetails></EmployeeDetails>
      </LazyLoad>
      <LazyLoad className="mb-28">
        <FAQSection></FAQSection>
      </LazyLoad>
    </div>
  );
};

export default HomePage;
