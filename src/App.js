import "./App.css";
import Routes from "./routes/Routes";
import { auth } from "./firebase/Firebase";
import { contextData } from "./contextData/ContextData";
import { useEffect, useState } from "react";
import Loader from './components/loader/Loader'
function App() {
  const [userData, setuserData] = useState('notSet');

  auth.onAuthStateChanged((u) => {
    u ?
      setuserData(u) : setuserData('noUser')
  });
  useEffect(() => { console.log(userData) }, [userData])
  return (
    <>
      <div className="App">
        <contextData.Provider value={userData}>
          {userData === 'notSet' ?
            <Loader />
            : <Routes />}
        </contextData.Provider>
      </div>
    </>
  );
}

export default App;
