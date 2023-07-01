import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Button,
} from "@chakra-ui/react";
import { LinkData } from "@components/utils/types";
import { CopyIcon } from "@chakra-ui/icons";
interface ReusableTableProps {
  data: LinkData[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({ data }) => {
  const toast = useToast();

  const handleCopyClick = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "The URL has been copied to the clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Table variant="simple" shadow={"xs"}>
      <Thead>
        <Tr bg="black">
          <Th
            fontSize="sm"
            color="white"
            borderTopLeftRadius="md"
            minWidth="200px"
          >
            Title
          </Th>
          <Th fontSize="sm" color="white" minWidth="200px">
            URL
          </Th>
          <Th fontSize="sm" color="white" minWidth="200px">
            Short URL
          </Th>
          <Th
            fontSize="sm"
            color="white"
            borderTopRightRadius="md"
            minWidth="200px"
          >
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr
            id={item.id.toString()}
            key={index}
            bg={index % 2 === 0 ? "#e9f8ff" : "white"}
          >
            <Td
              maxW="300px"
              minWidth="200px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="sm"
              py="8px"
            >
              {item.title}
            </Td>
            <Td
              maxW="300px"
              minWidth="200px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="sm"
              py="8px"
            >
              <IconButton
                icon={<CopyIcon />}
                aria-label="Copy URL"
                size="sm"
                mr={1}
                bg="#e3f1fe"
                onClick={() => handleCopyClick(item.long_url)}
              />
              {item.long_url}
            </Td>
            <Td
              maxW="300px"
              minWidth="200px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="sm"
              py="8px"
            >
              <IconButton
                icon={<CopyIcon />}
                aria-label="Copy URL"
                size="sm"
                mr={1}
                bg="#e3f1fe"
                onClick={() => handleCopyClick(item.short_url)}
              />
              {item.short_url}
            </Td>
            <Td
              maxW="300px"
              minWidth="200px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="sm"
              py="8px"
            >
              {/* Actions */}
              <Button colorScheme="brand" size="sm">
                Analytics
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ReusableTable;
