import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  // const logoSize = 100;
  return (
    <div className="bg-primary font-amandine rounded-full py-1 mx-4 flex items-center justify-center text-4xl font-black">
      <Link href="/">
        {/* <Image
          height={logoSize}
          width={logoSize}
          alt="logo"
          src="/cutelogo.svg"
        /> */}
        Athena
      </Link>
    </div>
  );
};

export default Logo;
