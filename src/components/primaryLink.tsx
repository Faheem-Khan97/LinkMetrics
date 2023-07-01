import { LinkProps } from "@components/utils/types";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const CustomLink: React.FC<LinkProps> = ({
  href,
  text,
  className,
  children,
}) => {
  return (
    <Link
      href={href}
      className={`py-2 px-4 rounded text-bold bg-black text-white ${className} `}
    >
      {text}
      {children}
    </Link>
  );
};
