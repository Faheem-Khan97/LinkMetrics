import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { isValidUrl } from "@components/utils";
import { addFormData, addFormProps } from "@components/utils/types";
import { useForm, SubmitHandler } from "react-hook-form";

const MyForm: React.FC<addFormProps> = ({ submitCallback, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addFormData>();

  const onSubmit: SubmitHandler<addFormData> = async (data, event) => {
    const { link, title } = data;

    if (isValidUrl(link)) {
      submitCallback(data);
      reset();
    }
    event?.preventDefault();
  };

  console.log({ errors });

  return (
    <Box minWidth="400px" mx="auto" mt="4" maxWidth="600">
      <Flex
        as="form"
        direction="column"
        rowGap={6}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl id="link">
          <FormLabel fontSize="sm">Paste Link</FormLabel>
          <Input
            type="text"
            fontSize="sm"
            placeholder="Paste the link you want to shorten"
            {...register("link", { required: true })}
          />
          {errors.link && (
            <span className="text-xs text-red-500 absolute left-0 bottom-[-20px]">
              This field is required
            </span>
          )}
        </FormControl>

        <FormControl id="title">
          <FormLabel fontSize="sm">Give Link a Title</FormLabel>
          <Input
            fontSize="sm"
            placeholder="Title will be used to search among links"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-xs text-red-500 absolute left-0 bottom-[-20px]">
              This field is required
            </span>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="brand"
          mt={2}
          isLoading={loading}
          loadingText="Shortening Link"
        >
          Shorten Link
        </Button>
      </Flex>
    </Box>
  );
};

export default MyForm;
