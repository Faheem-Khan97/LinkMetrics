import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as={"footer"}
      className="bg-black text-sm text-white mt-10 min-h-[8vh] items-center gap-4 justify-center flex-col "
    >
      <Text> All Rights Reserved &copy; {currentYear} Link Metrics</Text>
      <Text> Designed & Developed with ❤ - Faheem Khan </Text>
    </Flex>
  );
};

export default Footer;
