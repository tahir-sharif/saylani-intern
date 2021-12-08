import React, { useState } from "react";
import "./home.css";
import Settings from "../settings/Settings";
import Navbar from "../../components/navbar/Navbar";
import HomesContent from "./HomesContent";
const Home = () => {
  const [settingsActive, setsettingsActive] = useState(false);
  return (
    <>
      <Navbar setsettingsActive={setsettingsActive} />
      <div className="pageContainer">
        {settingsActive ? (
          <Settings setsettingsActive={setsettingsActive} />
        ) : (
          <HomesContent />
        )}
      </div>
    </>
  );
};

export default Home;
