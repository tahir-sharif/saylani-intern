import "./settings.css";
import { Input } from "@mui/material";
import { contextData } from "../../contextData/ContextData";
import { useContext, useState, useEffect } from "react";
import { fireStore } from "../../firebase/Firebase";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Settings = ({setsettingsActive}) => {
  const initialValue = { name: "", email: "" };
  const [settingsInfo, setsettingsInfo] = useState(initialValue);

  const ctxData = useContext(contextData);
  useEffect(() => {
    fireStore
      .collection("usersData")
      .doc(ctxData.uid)
      .get()
      .then((querySnapShot) => {
        const fireUserData = querySnapShot.data();
        setsettingsInfo({ ...fireUserData });
      });
  }, [ctxData]);
  const { name, email } = settingsInfo;

  const settingsHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ [name]: value });
    setsettingsInfo({ ...settingsInfo, name: value });
  };

  const settingsCancel = () => {
    setsettingsInfo(initialValue);
    setsettingsActive(false)
  };

  const settingsSubmit = () => {
    fireStore
      .collection("usersData")
      .doc(ctxData.uid)
      .update({
        ...settingsInfo,
      });
  };

  return (
    <div className="mnSettings">
      <h2>Settings</h2>
      <div className="settings">
        <div className="settingsBox">
          <div className="settingsName">User name :</div>
          <Input
            placeholder="User name"
            name="name"
            onChange={settingsHandler}
            value={name}
          />
        </div>
        <div className="settingsBox">
          <div className="settingsName">Email :</div>
          <Input
            placeholder="Email"
            name="email"
            onChange={settingsHandler}
            readOnly
            value={email}
          />
        </div>
      </div>
      <div className="saveChangesButtons">
        <Stack spacing={3} direction="row">
          <Button variant="contained" onClick={settingsSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={""}>
            Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};
export default Settings;
