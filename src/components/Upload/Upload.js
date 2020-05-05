import React from "react";
import classes from "./Upload.module.css";
const Upload = (props) => {
  const imageUploader = React.useRef(null);
  const handleImageUpload = (e) => {
    props.upload_evt(e);
  };
  return (
    <div
      className={classes.img_container}
      onClick={() => imageUploader.current.click()}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        className={classes.input}
      />
      <div className={classes.img_placeholder}>
        <img src={props.logo} className={classes.img} alt="company logo" />
      </div>
      <p className={classes.img_txt}>Click to upload Company logo</p>
    </div>
  );
};

export default Upload;
