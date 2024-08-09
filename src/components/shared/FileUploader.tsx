import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { url } from "inspector";

const FileUploader = ({ filedChange, mediaUrl }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      filedChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    maxFiles: 2,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col bg-dark-3 flex-center  rounded-[24px]  cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>
          <div className="flex flex-col items-center justify-center  w-full lg:h-auto p-5">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top"
            />
          </div>
          <p className="text-center pb-3 text-light-2 font-bolds">
            Click or drag photo to replace
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-3 w-full h-[300px]">
          <img
            src="/assets/icons/file-upload.svg"
            alt="upload icons"
            width={96}
            className=" "
          />

          <h2 className="font-bold mt-4 text-light-2">
            Drag and drop photo here
          </h2>
          <p className="font-semibold mt-4 text-light-4">SVG, PNG, JEG, JEPG</p>

          <Button className="mt-3">Choose from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
