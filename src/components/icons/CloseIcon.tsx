// src/components/icons/CloseIcon.tsx
import React from "react";
import Image from "next/image";

// eslint-disable-next-line react/function-component-definition
const CloseIcon: React.FC = () => {
  return <Image src="/icons/x-lg.svg" alt="Close" width={24} height={24} className="h-8 w-auto" />;
};

export default CloseIcon;
