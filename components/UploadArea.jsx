import React from "react";
import * as ApiService from "../services/ApiService";
import { useEffect } from "react";
import { useState } from "react";

export default function () {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [stringInput, setStringInput] = React.useState("");

  const [options, setOptions] = useState([
    { Name: "Merinfo", Selected: false },
    { Name: "Eniro", Selected: false },
    { Name: "MrKoll", Selected: false },
  ]);
  const modes = ["Regular", "Extra Detailed", "Api Exclusive", "Database Exclusive", "Scrape Exclusive"];
  const [mode, setMode] = useState("Regular");

  useEffect(() => {
    console.log("SELECTED FILE", selectedFile);
    console.log("OPTIONS", options);
    console.log("MODE", mode);
  }, [selectedFile, mode]);

  function handleSubmit() {
    const selectedOptions = options.filter((option) => option.Selected === true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      ApiService.postQuery(
        `/People?input=${stringInput}&selectedOptions=${selectedOptions.map((option) => option.Name)}&mode=${mode}`,
        formData
      ).then((response) => {
        console.log("response", response);
      });
    } catch (error) {
      return "error posting";
    }
  }

  function handleBtnClick(clickedOption) {
    // Create a copy of the options array
    const newOptions = clickedOption;
    newOptions.Selected = !newOptions.Selected;

    setOptions(options.map((option) => (option.Name === clickedOption.Name ? newOptions : option)));
  }

  return (
    <>
      <div>
        <div className=" flex border rounded-xl ">
          <div className="flex-wrap ">
            <input
              className="w-full rounded-t-xl  border-b gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
              id="chat"
              rows="1"
              placeholder="Input ex:&nbsp;C2:C12 "
              value={stringInput}
              onChange={(e) => setStringInput(e.target.value)}></input>

            <div className="flex justify-center bg-gray-100  hover:bg-blue-500">
              <div>
                <label for="mode">Choose mode:</label>
                <select
                  onChange={(e) => setMode(e.target.value)}
                  className="bg-transparent cursor-pointer font-bold"
                  name="mode"
                  id="mode">
                  {modes.map((mode) => (
                    <option value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                {options.map((option) =>
                  option.Selected ? (
                    <button
                      onClick={() => handleBtnClick(option)}
                      class=" bg-blue-400 text-white inline-block px-6 py-2.5  font-medium text-xs hover:bg-blue-500 leading-tight uppercase transition duration-150 ease-in-out ">
                      {option.Name}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBtnClick(option)}
                      class=" inline-block px-6 py-2.5  font-medium text-xs leading-tight uppercase hover:bg-blue-500 transition duration-150 ease-in-out">
                      {option.Name}
                    </button>
                  )
                )}
              </div>
            </div>

            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue tracking-wide uppercase -blue cursor-pointer hover:bg-blue-400 hover:text-white">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              {selectedFile ? (
                <span className="mt-2 text-base leading">{selectedFile.name}</span>
              ) : (
                <span className="mt-2 text-base leading">Select a file only .xlsx</span>
              )}

              <input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                type="file"
                className="hidden"
                accept=".xlsx"
              />
            </label>
            <button
              onClick={() => handleSubmit()}
              className=" w-full text-blue-700 font-semibold hover:text-white py-2 px-4  -blue cursor-pointer hover:bg-blue-400 hover:text-white-transparent rounded-b-xl border-t">
              Run
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
