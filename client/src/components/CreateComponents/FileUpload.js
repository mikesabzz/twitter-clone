import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { api } from "../../services/apiService";
const apiRouter = api;

const FileUpload = (props) => {
  const [uploaded, setUploaded] = useState(false);
  const [userId] = useState(props.user.id);
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("userId", userId);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      await apiRouter.post("/app/upload", formData, config);
      setUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderFile = () => {
    if (file) {
      return (
        <div className="file-data">
          <p>File Name: {file.name}</p>
          <p>File Type: {file.type}</p>
          <p>Modification Date: {file.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <h4 className="font-weight-bold">
          Upload a profile picture before pressing the 'Upload!' button!
        </h4>
      );
    }
  };

  if (uploaded) {
    return <Redirect to={"/dashboard/user/create"} />;
  }
  return (
    <div>
      <h1>Upload profile picture</h1>
      <div>
        <input type="file" htmlFor="file" onChange={onFileChange} required />
        <br />
        <button
          className="btn btn-primary font-weight-bold rounded"
          onClick={onFileUpload}
        >
          Upload!
        </button>
      </div>
      <br />
      {renderFile()}
    </div>
  );
};

export default FileUpload;
