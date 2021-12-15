import React from "react";

const Posts = ({ posts }) => {
  return (
    <>
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
