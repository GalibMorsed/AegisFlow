import React from "react";
import Nav from "../homeComponents/Nav";
import Body from "../homeComponents/Body";
import homeSection1 from "../homeComponents/homeSection1";
import homeSection2 from "../homeComponents/homeSection2";
import homeSection3 from "../homeComponents/homeSection3";
import homeFooter from "../homeComponents/homeFooter";

const Home = () => {
  return (
    <div>
      <Nav />
      <Body />
      <homeSection1 />
      <homeSection2 />
      <homeSection3 />
      <homeFooter />
    </div>
  );
};

export default Home;
