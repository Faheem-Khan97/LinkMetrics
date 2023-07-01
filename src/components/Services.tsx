import { CheckCircleIcon, CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { Flex, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const Services: React.FC = () => {
  return (
    <Flex direction="column" py={12}>
      <Text
        fontWeight="bold"
        mb={4}
        className="bg-gradient-to-r text-sm md:text-2xl from-black via-gray-600 text-transparent to-gray-300 bg-clip-text"
      >
        A Convenient Dashboard With -
      </Text>
      <UnorderedList styleType="none" pl={0}>
        <ListItem display="flex" alignItems="center" gap={2} my={6}>
          <CheckCircleIcon color={"teal"} width={5} height={5} />
          <Text className="text-sm font-semibold">Search By Title</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center" gap={2} my={6}>
          <CheckCircleIcon color={"teal"} width={5} height={5} />
          <Text className="text-sm font-semibold">Sort by Newest/Oldest</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center" gap={2} my={6}>
          <CheckCircleIcon color={"teal"} width={5} height={5} />
          <Text className="text-sm font-semibold">Copy Links Easily</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center" gap={2} my={6}>
          <TimeIcon color={"teal"} width={5} height={5} />
          <Text className="text-sm font-semibold">Analytics Coming Soon</Text>
        </ListItem>
      </UnorderedList>
    </Flex>
  );
};

export default Services;
