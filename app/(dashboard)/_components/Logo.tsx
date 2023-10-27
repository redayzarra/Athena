import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const logoSize = 100;
  return (
    <div className="bg-primary rounded-full py-2 mx-4 flex items-center justify-center">
      <Link href="/">
        <Image
          height={logoSize}
          width={logoSize}
          alt="logo"
          src="/cutelogo.svg"
        />
      </Link>
    </div>
  );
};

export default Logo;
