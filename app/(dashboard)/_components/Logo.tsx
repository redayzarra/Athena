import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  // const logoSize = 100;
  return (
    <div className="py-1 mx-4 flex font-libre items-center justify-center text-4xl">
      <Link href="/">Athena</Link>
    </div>
  );
};

export default Logo;
