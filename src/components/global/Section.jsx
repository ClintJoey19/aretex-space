import React from "react";

const Section = ({ className, children }) => {
  return <section className={`w-full ${className}`}>{children}</section>;
};

export default Section;
