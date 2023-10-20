"use client"
import React, { useState } from "react";
import Image from 'next/image'
import ImageUpload from "../../../assets/Images/imageUpload.png";

export default function App() {
  const [image, setImage] = useState({ pre: "", preview: "", raw: "" });

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        pre: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

  return (
    <div className="positionimgbox ">
      <div>
        <label htmlFor="upload-button" className="formlabel textcenterimg" style={{ display: "block" }}> Logo :
          <br />
          {image.preview ? (
            <Image src={image.preview}
              alt="dummy"
              width={200}
              height={200}
            />
          ) : (
            <>
              <div className="ImgShadowBox">
                <Image className="imgupload" src={ImageUpload} alt="IGI" />
                <p className="uploadsize" style={{ color: "#000" }}><b>Click On The Image To Upload</b></p>
                <p className="uploadsize"> e.g file(JPG,PNG) (Max size 40 Mb)</p>


              </div>
            </>
          )}

          <input
            type="file"
            id="upload-button"
            style={{ opacity: "0", display: "none" }}
            onChange={handleChange}
          />

        </label>
      </div>




    </div>
  );
}
