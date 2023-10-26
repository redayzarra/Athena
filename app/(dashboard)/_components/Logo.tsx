import Image from "next/image";

export const Logo = () => {
  const logoSize = 100;

  return (
    <Image
      height={logoSize}
      width={logoSize}
      alt="logo"
      src="/whitecutelogo.svg"
    />
  )
}