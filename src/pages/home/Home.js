import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import { contextData } from "../../contextData/ContextData";
import { fireStore } from "../../firebase/Firebase";
import Settings from "../settings/Settings";
import Navbar from "../../components/navbar/Navbar";
import Posts from "./Posts";
import OtherUserProfile from "../user profile/otherUserProfile/OtherUserProfile";
import PostUpload from "./PostUpload";


const Home = () => {
  const initialValue = { name: "", email: "", profileImageUrl: "" };
  const [settingsActive, setsettingsActive] = useState(false);
  const [fireUserData, setfireUserData] = useState(initialValue);
  const ctxData = useContext(contextData);
  const userUid = ctxData.uid;
  const [alreadySet, setalreadySet] = useState(false);
  const [posts, setposts] = useState([]);
  const [srchedUserData, setsrchedUserData] = useState({});

  useEffect(() => {
    getFireStoreData();
  }, []);

  useEffect(() => {
    console.log(srchedUserData);
  }, [srchedUserData]);

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
  const getUserDataFromSrch = (e) => {
    const dataArr = [];
    setsrchedUserData({});
    fireStore
      .collection("usersData")
      .doc(e.target.id)
      .get()
      .then((data) => {
        data = data.data()
        const accountId = data.accountId;
        dataArr.push(data);
        const accountPosts = fireStore.collection('usersData').where('postedBy', '==', accountId)
        setsrchedUserData(...dataArr);
        console.log(accountPosts.get().then((snapshaot) => {
          console.log(snapshaot)
        }))
      });
  };

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
        srchedUserData={srchedUserData}
        setsrchedUserData={setsrchedUserData}
        getUserDataFromSrch={getUserDataFromSrch}
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
            {srchedUserData.name ? (
              <OtherUserProfile allPosts={posts} srchedUserData={srchedUserData} />
            ) : (
              <>
                <PostUpload fireUserData={fireUserData}/>
                <Posts posts={posts} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
