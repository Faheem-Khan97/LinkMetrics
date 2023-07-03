import { Flex, Text } from "@chakra-ui/react";
import { AnalyticsRowProps } from "@components/utils/types";

export const AnalyticsRow: React.FC<AnalyticsRowProps> = ({ label, value }) => (
  <Flex gap={2} align="center">
    <Text fontSize="sm" fontWeight="bold" minW="140px">
      {label} :
    </Text>
    <Text fontWeight="bold" fontSize="3xl" color="green.400">
      {value}
    </Text>
  </Flex>
);
