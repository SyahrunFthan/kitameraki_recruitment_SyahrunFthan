import { Spinner } from "@fluentui/react-components";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-white">
      <Spinner size="medium" labelPosition="after" label="Loading Data...." />
    </div>
  );
};

export default LoadingPage;
