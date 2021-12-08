import './App.css';
import Routes from './routes/Routes';
import { auth } from './firebase/Firebase';
import { contextData } from './contextData/ContextData';
import Navbar from './components/navbar/Navbar'
import { useState } from 'react';
function App() {
  const [userData, setuserData] = useState({})
  auth.onAuthStateChanged((u) => {
    if (u) {
      setuserData({ user: u.user.user })
    } else setuserData('noUser')
  })
  return (
    <>
      <div className="App">
        <contextData.Provider value={userData}>
          <Navbar />
          <Routes />
        </contextData.Provider>
      </div>
    </>
  );
}

export default App;