import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`w-[80%] min-w-[1220px] ${className}`}>{children}</div>
  );
};

export default Container;
