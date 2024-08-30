import useTitle from "../utilities/useTitle";
import LazyLoad from "react-lazy-load";

const HomePage = () => {
  useTitle();

  return (
    <div className="container mx-auto my-16">
      <LazyLoad>
        <p>This is Homepage</p>
      </LazyLoad>
    </div>
  );
};

export default HomePage;
