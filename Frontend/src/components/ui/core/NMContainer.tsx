import React, { ReactNode } from "react";

interface NMContainerProps {
  children: ReactNode;
  className?: string;
}

const NMContainer = ({ children, className = "" }: NMContainerProps) => {
  return (
    <div className={`container mx-auto  ${className}`}>{children}</div>
  );
};

export default NMContainer;
