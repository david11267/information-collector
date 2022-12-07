import React from "react";
import UploadArea from "../components/UploadArea";

export default function Action() {
  return (
    <div className="grid h-screen place-items-center">
      <h1 className=" text-6xl">Aslan Info</h1>
      <div>
        <UploadArea />
      </div>
    </div>
  );
}
