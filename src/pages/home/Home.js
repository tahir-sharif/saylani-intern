import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import Settings from "../settings/Settings";
import Navbar from "../../components/navbar/Navbar";
import HomesContent from "./HomesContent";
import { contextData } from "../../contextData/ContextData";
import { fireStore } from "../../firebase/Firebase";

const Home = () => {
  const initialValue = { name: "", email: "", profileImageUrl: "" };
  const [settingsActive, setsettingsActive] = useState(false);
  const [fireUserData, setfireUserData] = useState(initialValue);
  const ctxData = useContext(contextData);
  const userUid = ctxData.uid;
  const [alreadySet, setalreadySet] = useState(false);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    getFireStoreData();
  }, []);

  const getFireStoreData = () => {
    fireStore
      .collection("usersData")
      .doc(userUid)
      .get()
      .then((querySnapShot) => {
        const fireUserData = querySnapShot.data();
        setfireUserData({ ...fireUserData });
      });
  };
  console.log("settings page");
  fireStore.collection("posts").onSnapshot((snap) => {
    const dataArr = [];
    snap.docChanges().forEach((change) => {
      if (change.type === "added") {
        dataArr.push(change.doc.data());
        console.log("set");
      }
    });
    if (!alreadySet) {
      setposts(dataArr);
      setalreadySet(true);
      console.log(dataArr);
    }
  });

  return (
    <>
      <Navbar
        setsettingsActive={setsettingsActive}
        profileImageUrl={fireUserData.profileImageUrl}
      />
      <div className="pageContainer">
        {settingsActive ? (
          <Settings
            setsettingsActive={setsettingsActive}
            fireUserData={fireUserData}
            getFireStoreData={getFireStoreData}
            userUid={userUid}
          />
        ) : (
          <>
            <HomesContent getFireStoreData={getFireStoreData} />
            <div className="postsContainer">
              {posts
                ? posts.map((obj) => {
                    return (
                      <div className="post">
                        <div className="postTxt">{obj.text}</div>
                        {obj.imageUrl ? (
                          <img src={obj.imageUrl} alt="image" />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                : ""}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
