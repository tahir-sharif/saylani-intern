import React from "react";
import Posts from "../../home/Posts";

const OtherUserProfile = ({ allPosts, srchedUserData }) => {
  const othersProfilePost = () => {
    return allPosts.filter((post) => {
      return post.accountId === srchedUserData.accountId;
    });
  };
  const otherPosts = othersProfilePost();
  const { profileImageUrl, name } = srchedUserData;
  return (
    <>
    <div>{'< back'}</div>
      <div className="profileProfilePic">
        <div className="image">
          <img
            src={
              profileImageUrl
                ? profileImageUrl
                : "https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg"
            }
          />
        </div>
          <h3>{name}</h3>
      </div>
      {otherPosts.length ? <Posts posts={otherPosts} /> : "No Posts"}
    </>
  );
};

export default OtherUserProfile;
