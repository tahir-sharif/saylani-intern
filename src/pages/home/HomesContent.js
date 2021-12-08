import React, { useState } from "react";
import UploadButton from "../../components/uploadButton/UploadButton";
import { storage } from "../../firebase/Firebase";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const HomesContent = () => {
  const [image, setimage] = useState("");
  const imageHandler = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setimage(e.target.files[0]);
    }
  };

  const uploadImageToStorage = (path, imageName) => {
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);

    task
      .then(() => {
        console.log("Image uploaded to the bucket!");
      })
      .catch((e) => console.log("uploading image error => ", e));
  };
  return (
    <div className="uploadImage">
        {image.name}
      <input type="file" onChange={imageHandler} />
    </div>
  );
};

export default HomesContent;
