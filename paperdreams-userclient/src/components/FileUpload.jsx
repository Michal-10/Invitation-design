import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFileToS3 } from '../redux/invitationActions';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadFileToS3(file)); // מפעילים את הפעולה של העלאת הקובץ ל-S3
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
