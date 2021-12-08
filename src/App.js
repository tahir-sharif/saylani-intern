import "./App.css";
import Routes from "./routes/Routes";
import { auth } from "./firebase/Firebase";
import { contextData } from "./contextData/ContextData";
import { useEffect, useState } from "react";
function App() {
  const [userData, setuserData] = useState({});

  auth.onAuthStateChanged((u) => {
    if (u) {
        setuserData(u);
      }
  });
  useEffect(()=>{console.log(userData)},[userData])
  return (
    <>
      <div className="App">
        <contextData.Provider value={userData}>
          <Routes />
        </contextData.Provider>
      </div>
    </>
  );
}

export default App;
