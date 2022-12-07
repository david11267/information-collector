import React from "react";
import { useEffect } from "react";

export default function () {
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };

  const [selectedFile, setSelectedFile] = React.useState();

  useEffect(() => {
    console.log("selectedFile", selectedFile);
  }, [selectedFile]);

  return (
    <>
      <div className="flex  items-center justify-center bg-grey-lighter">
        <form action="">
          <div className="flex">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-l-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              {selectedFile ? (
                <span className="mt-2 text-base leading">{selectedFile[0].name}</span>
              ) : (
                <span className="mt-2 text-base leading">Select a file only .xlsx</span>
              )}

              <input onChange={(e) => setSelectedFile(e.target.files)} type="file" className="hidden" accept=".xlsx" />
            </label>
            <button class="bg-transparent  text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue cursor-pointer hover:bg-blue-400 hover:text-white-transparent rounded-r-lg">
              Uppload
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
