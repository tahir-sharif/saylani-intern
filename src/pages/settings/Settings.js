import "./settings.css";
import { firebase, auth } from "../../firebase/Firebase";
import { Input } from "@mui/material";

const Settings = () => {
  auth.onAuthStateChanged = () => {
    console.log("auth State Changed");
  };
  return (
    <div className="settingsContainer">
      <div className="mnSettings">
        <h2>Settings</h2>
        <div className="settings">
          <div className="settingsBox">
            <div className="settingsName">User name :</div>
            <Input placeholder="User name" value='Tahir' />
          </div>
          <div className="settingsBox">
            <div className="settingsName">Email :</div>
            <Input readOnly  value='Tahir@gmail.com'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
