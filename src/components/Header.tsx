import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { HeaderProps } from "@components/utils/types";
import Link from "next/link";

const Header: React.FC<HeaderProps> = ({ username, signOut }) => {
  return (
    <Flex className="flex px-4 items-center">
      <Flex flex={1}>
        <Image
          alt="Link Metrics Logo"
          src={"/LinkMetrics.svg"}
          width="20"
          height="20"
        />
      </Flex>
      <Flex columnGap={6} align={"center"}>
        <Text className="text-sm">{username}</Text>
        <Button
          size="xs"
          variant="link"
          className="underline"
          colorScheme="brand"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
