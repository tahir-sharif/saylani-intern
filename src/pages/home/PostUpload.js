import React, { useRef, useState } from "react";
import { auth, fireStore, storage } from "../../firebase/Firebase";
import { Input, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

const PostUpload = ({ fireUserData }) => {
  const [postPopup, setpostPopup] = useState(false);
  const [image, setimage] = useState("");
  const [imageTarget, setimageTarget] = useState({});
  const inputField = useRef();

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0]);
      setimage(image);
      setimageTarget(e.target.files);
    } else {
      setimageTarget({});
      setimage("");
    }
  };
  const closePopup = () => {
    setimage("");
    setpostPopup(false);
  };

  const closeImagePreview = () => {
    setimage("");
  };

  const uploadImageToStorage = (image, imageName) => {
    let reference = storage.ref(`images/${imageName}`);
    let task = reference.put(image);

    task.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images`)
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            fireStore.collection("posts").add({
              text: inputField.current.value,
              imageUrl: url,
              postedBy: auth.currentUser.email,
            });
          });
      }
    );
  };

  const postContent = () => {
    const txt = inputField.current.value;
    if (imageTarget) {
      uploadImageToStorage(imageTarget[0], imageTarget[0].name);
    } else {
      const user = auth .currentUser
      fireStore.collection("posts").add({
        text: txt,
        postedBy: auth.user.email,
        accountId: auth.user.uid
      });
    }
  };

  return (
    <div className="posts">
      <div className="uploadContent" onClick={() => setpostPopup(true)}>
        <div className="wts">What's On your Mind, {fireUserData.name}?</div>
      </div>

      {postPopup ? (
        <>
          <div className="backdrop" onClick={closePopup}></div>
          <div className="uploadPostPop">
            <div className="uploadPostContents">
              <Input
                placeholder="Description"
                autoFocus
                name="text"
                inputProps={{
                  ref: inputField,
                  spellCheck: "false",
                  autocomplete: "off",
                }}
              />

              {image ? (
                <div className="postImagePreview">
                  <div
                    className="closeImagePreview"
                    onClick={closeImagePreview}
                  >
                    <CloseIcon />
                  </div>
                  <img src={image} alt="image" />
                </div>
              ) : (
                <Stack
                  className="addToPost"
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <input
                    id="icon-button-file"
                    type="file"
                    accept="image/*"
                    onChange={imageHandler}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="icon-button-file" className="addToPost">
                    Add to your Post
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <ImageIcon />
                    </IconButton>
                  </label>
                </Stack>
              )}
              <Button
                variant="contained"
                className="postButton"
                onClick={postContent}
              >
                Post
              </Button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostUpload;
