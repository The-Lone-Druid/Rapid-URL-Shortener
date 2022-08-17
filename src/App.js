import React, { useRef, useState } from "react";
import Loader from "./Loader";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [isTextCopied, setisTextCopied] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const urlInputRef = useRef();

  const generateShortenedUrl = async (url) => {
    setisLoading(true);
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", url);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_HOST
      },
      body: encodedParams
    };

    fetch(`https://${process.env.REACT_APP_X_RAPIDAPI_HOST}/shorten`, options)
      .then((response) => response.json())
      .then((response) => {
        setisLoading(false);
        setShortenedUrl(response?.result_url);
        console.log(response);
      })
      .catch((err) => {
        setisLoading(false);
        setShortenedUrl(null);
        console.error(err);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setisTextCopied(true);
    setTimeout(() => {
      setisTextCopied(false);
    }, 1500);
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-gradient-custom">
      {isLoading && <Loader />}
      <div
        className="mx-auto text-center p-md-0 p-3 overflow-visible"
        style={{ maxWidth: "700px", overflowY: "auto" }}
      >
        <h1 className="display-1 fw-bold">Create Short URL!</h1>
        <h4 className="mt-3">
          Fast and simple website to create a shortened URL, easy to remember
          and share.
        </h4>
        <div className="mt-5 shadow-lg rounded-3 bg-white-opacity p-sm-5 p-4">
          {shortenedUrl ? (
            <div>
              <div className="d-flex flex-sm-row flex-column align-items-center justify-content-center bg-gradient rounded-pill text-white bg-dark shadow">
                {shortenedUrl}
                {isTextCopied ? (
                  <i className="bi bi-check2 ml-2 p-3"></i>
                ) : (
                  <i
                    className="bi bi-clipboard ml-2 p-3"
                    style={{ cursor: "pointer" }}
                    onClick={copyToClipboard}
                  ></i>
                )}
              </div>
              <div className="text-center d-flex">
                <button
                  className="btn btn-dark py-2 bg-gradient px-4 mt-4 rounded-pill w-100"
                  onClick={() => {
                    setShortenedUrl(null);
                  }}
                >
                  Shorten more URL!
                </button>
                <div className="px-2"></div>
                <button
                  className="btn btn-primary py-2 bg-gradient px-4 mt-4 rounded-pill w-100"
                  onClick={() => {
                    window.open(shortenedUrl, "_blank");
                  }}
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  Visit site
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-sm-row flex-column align-items-center justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="https://www.example.com/"
                ref={urlInputRef}
              />
              <button
                className="btn btn-primary px-4 ms-sm-2 mt-sm-0 mt-2"
                style={{ whiteSpace: "nowrap" }}
                onClick={() => {
                  if (urlInputRef.current.value) {
                    generateShortenedUrl(urlInputRef.current.value);
                  } else {
                    alert("Please enter URL to shorten.");
                  }
                }}
              >
                Get Short URL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
