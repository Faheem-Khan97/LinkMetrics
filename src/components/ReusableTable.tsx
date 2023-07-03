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
  Text,
  Flex,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  Divider,
} from "@chakra-ui/react";
import { AnalyticsI, ReusableTableProps } from "@components/utils/types";
import { CopyIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";
import { Dhurjati } from "next/font/google";
import { AnalyticsRow } from "./AnalyticsRow";

const ReusableTable: React.FC<ReusableTableProps> = ({ data }) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsI>({});
  const [analyticsApiLoading, setAnalyticsApiLoading] = useState(false);

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

  const getAnalytics = async (id: string) => {
    setIsOpen(true);
    setAnalyticsApiLoading(true);
    try {
      const resp = await axios.post("/api/get-analytics", {
        id,
      });
      const { clicks, sessions } = resp.data;
      setAnalytics({ totalClicks: clicks, uniqueVisitors: sessions });
    } catch (error) {
      toast({
        title: "Failed to fetch analytics",
        duration: 2000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setAnalyticsApiLoading(false);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setAnalytics({});
  };

  return (
    <>
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
                <Button
                  colorScheme="brand"
                  size="sm"
                  onClick={() => getAnalytics(item.short_link_id)}
                >
                  Analytics
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={5} minW={"380px"} minH="260px">
          <ModalCloseButton />

          <Flex justify="center" align="center" direction="column">
            <Text fontSize={"2xl"} fontWeight="semibold" mb={4}>
              {" "}
              Link Analytics
            </Text>
            <Divider my={2} />

            {!analyticsApiLoading ? (
              <>
                <AnalyticsRow
                  label="Total Clicks"
                  value={analytics.totalClicks || 0}
                />
                <Divider my={2} />
                <AnalyticsRow
                  label=" Unique Vistors"
                  value={analytics.uniqueVisitors || 0}
                />
                <Divider my={2} />

                <Text fontSize="xs" mt={6} color="blue.400">
                  Advanced Analytics Coming Soon.{" "}
                </Text>
              </>
            ) : (
              <Spinner height={16} mt={4} width={16} />
            )}
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReusableTable;
