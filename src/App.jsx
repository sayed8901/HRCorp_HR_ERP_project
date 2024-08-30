import { Outlet } from "react-router-dom";
import "./App.css";
// import Navbar from "./navbar/components/Navbar/Navbar";
import { useContext } from "react";
import { ThemeContext } from "./contextProviders/ThemeContextProvider";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { themeClassName } = useContext(ThemeContext);

  return (
    <div
      data-theme={themeClassName}
      className="container mx-auto flex flex-col min-h-screen"
    >
      <Navbar></Navbar>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
