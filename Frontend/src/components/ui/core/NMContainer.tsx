import React, { ReactNode } from "react";

interface NMContainerProps {
  children: ReactNode;
  className?: string;
}

const NMContainer = ({ children, className = "" }: NMContainerProps) => {
  return (
    <div className={` mx-5  ${className}`}>{children}</div>
  );
};

export default NMContainer;
