import "./settings.css";
import { Input } from "@mui/material";
import { contextData } from "../../contextData/ContextData";
import { useContext, useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Settings = () => {
  const ctxData = useContext(contextData)
  return (
    <div className="mnSettings">
      <h2>Settings</h2>
      <div className="settings">
        <div className="settingsBox">
          <div className="settingsName">User name :</div>
          <Input placeholder="User name" value='Tahir' />
        </div>
        <div className="settingsBox">
          <div className="settingsName">Email :</div>
          <Input readOnly value='Tahir@gmail.com' />
        </div>
      </div>
      <div className="saveChangesButtons">
        <Stack spacing={3} direction="row">
          <Button variant="contained">Save</Button>
          <Button variant="outlined">Cancel</Button>
        </Stack>
      </div>
    </div>
  );
};
export default Settings;
