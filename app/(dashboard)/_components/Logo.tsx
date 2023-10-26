import Image from "next/image";
import React from "react";

const Logo = () => {
  const logoSize = 100;
  return (
    <div className="bg-primary rounded-full py-2 mx-5 flex items-center justify-center">
      <Image
        height={logoSize}
        width={logoSize}
        alt="logo"
        src="/cutelogo.svg"
      />
    </div>
  );
};

export default Logo;
