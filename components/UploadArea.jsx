import React from "react";
import * as ApiService from "../services/ApiService";
import { useEffect } from "react";

export default function () {
  const [selectedFile, setSelectedFile] = React.useState();
  const [spreadsheetArea, setSpreadsheetArea] = React.useState("");

  useEffect(() => {
    console.log("selectedFile", selectedFile);
  }, [selectedFile]);

  function handleSubmit() {
    console.log("selectedFile", selectedFile);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("spreadsheetArea", spreadsheetArea);
    console.log("data", data);
    try {
      ApiService.postQuery("/People", data).then((response) => {
        console.log("response", response);
      });
    } catch (error) {
      return "error posting";
    }
  }

  return (
    <>
      <div>
        <div className=" flex border rounded-xl ">
          <div className="flex-wrap">
            <input
              className="w-full rounded-xl  border-b gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
              id="chat"
              rows="1"
              placeholder="Input ex:&nbsp;C2:C12 "
              value={spreadsheetArea}
              onChange={(e) => setSpreadsheetArea(e.target.value)}></input>

            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded tracking-wide uppercase -blue cursor-pointer hover:bg-blue-400 hover:text-white">
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
            <button
              onClick={() => handleSubmit()}
              className=" w-full bg-transparent  text-blue-700 font-semibold hover:text-white py-2 px-4  -blue cursor-pointer hover:bg-blue-400 hover:text-white-transparent rounded-xl border-t">
              Uppload
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
