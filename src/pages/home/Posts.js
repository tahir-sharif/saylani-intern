import React from "react";
import PostUpload from "./PostUpload";

const Posts = ({ posts, fireUserData }) => {
  return (
    <>
      <PostUpload fireUserData={fireUserData} />
      <div className="postsContainer">
        {posts
          ? posts.map((obj) => {
              return (
                <div className="post">
                  <div className="postTxt">{obj.text}</div>
                  {obj.imageUrl ? <img src={obj.imageUrl} alt="image" /> : ""}
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Posts;
