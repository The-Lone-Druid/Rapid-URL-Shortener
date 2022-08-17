import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="vh-100 positon-fixed custom-loader d-flex align-items-center justify-content-center w-100">
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
