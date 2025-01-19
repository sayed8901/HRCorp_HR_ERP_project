import HeroSection from "../components/HeroSection";
import StatDashboard from "../components/StatDashboard";
import useTitle from "../utilities/useTitle";
import LazyLoad from "react-lazy-load";
import EmployeeDetails from "./HR_staff_management/EmployeeDetails/EmployeeDetails";
import FAQSection from "../components/FAQSection";
import AllEmployeeSlider from "../components/AllEmployeeSlider";
import ManpowerStatus from "./reports/ManpowerStatus";

const HomePage = () => {
  useTitle();

  return (
    <div>
      <LazyLoad>
        <HeroSection></HeroSection>
      </LazyLoad>
      <LazyLoad className="container mx-auto">
        <StatDashboard></StatDashboard>
      </LazyLoad>
      <LazyLoad className="container mx-auto">
        <ManpowerStatus></ManpowerStatus>
      </LazyLoad>
      <LazyLoad className="container mx-auto">
        <AllEmployeeSlider></AllEmployeeSlider>
      </LazyLoad>
      <LazyLoad className="container mx-auto mb-28">
        <EmployeeDetails></EmployeeDetails>
      </LazyLoad>
      <LazyLoad className="container mx-auto">
        <FAQSection></FAQSection>
      </LazyLoad>
    </div>
  );
};

export default HomePage;
