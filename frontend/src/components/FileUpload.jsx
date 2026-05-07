import { useState } from "react";
import axios from "axios";

function FileUpload() {

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      alert(res.data.message);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Document Upload Dashboard
      </h1>

      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <br />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Upload Files
      </button>

    </div>
  );
}

export default FileUpload;