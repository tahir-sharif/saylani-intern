import "./settings.css";
import { Input } from "@mui/material";
import { contextData } from "../../contextData/ContextData";
import { useState, useRef, useEffect } from "react";
import { fireStore } from "../../firebase/Firebase";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { storage } from "../../firebase/Firebase";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CustomizedSnackbars, { handleClick } from "../../components/snackbar/Snackbar";

const Settings = ({
  setsettingsActive,
  fireUserData,
  getFireStoreData,
  userUid,
}) => {
  const [settingsInfo, setsettingsInfo] = useState(fireUserData);
  const { name, email, profileImageUrl } = fireUserData;
  const [toggleImgZoom, settoggleImgZoom] = useState(false);
  const [tempImage, settempImage] = useState("");
  const imageRef = useRef();
  const [imageUpdateLoading, setimageUpdateLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 1500);
  }, [profileImageUrl])

  const settingsHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ [name]: value });
    setsettingsInfo({ ...settingsInfo, name: value });
  };

  const hideSettings = () => {
    setsettingsInfo(fireUserData);
    setsettingsActive(false);
  };

  const settingsSubmit = () => {
    fireStore
      .collection("usersData")
      .doc(userUid)
      .update({
        ...settingsInfo,
      })
      .then(() => {
        hideSettings();
      });
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
            fireStore
              .collection("usersData")
              .doc(userUid)
              .update({
                profileImageUrl: url,
              })
              .then(() => {
                setimageUpdateLoading(false)
                hideProfileBox();
                getFireStoreData();
              });
          });
      }
    );
  };
  const UpdateProfileImage = () => {
    if (tempImage.length) {
      console.log(imageRef);
      const file = imageRef.current.files[0];
      const name = imageRef.current.files[0].name;
      console.log(profileImageUrl);
      setimageUpdateLoading(true);
      profileImageUrl
        ? storage
          .refFromURL(profileImageUrl)
          .delete()
          .then(() => {
            uploadImageToStorage(file, name);
          })
        : uploadImageToStorage(file, name);
    }
  };

  const hideProfileBox = () => {
    settempImage("");
  };

  const previewImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const src = URL.createObjectURL(image);
      settempImage(src);
    } else {
      settempImage("");
    }
  };

  return (
    <div className="mnSettings">
        <CustomizedSnackbars msg='Profile image successfully' />
      <h2>Settings</h2>
      {tempImage.length ? (
        <>
          <div className="backdrop"></div>
          <div className="updateProfile">
            <div className="previewImage">
              <img src={tempImage} alt="image" />
            </div>
            <div className="buttons">
              <Button variant="contained" className={`updateButton ${imageUpdateLoading ? 'loading' : ''}`} onClick={UpdateProfileImage}>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                <div>{imageUpdateLoading ? 'Updating...' : 'Update Profile'}</div>
              </Button>
              <Button variant="outlined" className={`updateButton ${imageUpdateLoading ? 'loading' : ''}`} onClick={hideProfileBox}>
                Cancel
              </Button>

            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="settings">
        <div className="profileProfilePic">
          <div className="image">
            <div className="uploadImage">
              <input
                type="file"
                accept="image/*"
                id="myFile"
                onClick={(e) => {
                  e.target.value = null;
                }}
                ref={imageRef}
                onChange={previewImage}
              />
              <label htmlFor="myFile">
                <PhotoCameraIcon />
              </label>
            </div>
            <img src={profileImageUrl ? profileImageUrl : 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'} />
          </div>
        </div>

        <div className="settingsBox">
          <div className="settingsName">User name :</div>
          <Input
            placeholder="User name"
            name="name"
            onChange={settingsHandler}
            value={name}
          />
        </div>
        <div className="settingsBox">
          <div className="settingsName">Email :</div>
          <Input
            placeholder="Email"
            name="email"
            onChange={settingsHandler}
            readOnly
            value={email}
          />
        </div>
      </div>
      <div className="saveChangesButtons">
        <Stack spacing={3} direction="row">
          <Button variant="contained" onClick={settingsSubmit}>
            Profile Save
          </Button>
          <Button variant="outlined" onClick={hideSettings}>
            Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};
export default Settings;
