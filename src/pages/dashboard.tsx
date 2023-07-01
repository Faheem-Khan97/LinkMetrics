import Passage from "@passageidentity/passage-node";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import styles from "../styles/App.module.css";
import { CustomLink } from "@components/components/primaryLink";
import AddLinkForm from "@components/components/addForm";
import axios from "axios";

import {
  Button,
  CircularProgress,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import Router from "next/router";
import {
  getAuthenticatedUserFromSession,
  passage,
} from "@components/utils/passage";
import { DashboardProps, LinkData, Option } from "@components/utils/types";
import ReusableTable from "@components/components/ReusableTable";
import { getLinks } from "@components/utils";
import { debounce } from "lodash";
import { SearchIcon } from "@chakra-ui/icons";
import Header from "@components/components/Header";

const options: Option[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const Dashboard: NextPage<DashboardProps> = ({
  isAuthorized,
  username,
  userId,
}) => {
  const [shortedLinks, setShortedLinks] = useState<LinkData[]>([]);
  const [isLinkTableLoading, setIsLinkTableLoading] = useState(true);
  const toast = useToast();
  const [selectedOption, setSelectedOption] = useState<Option>({
    value: "newest",
    label: "Newest",
  });

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/login");
    }
    require("@passageidentity/passage-elements/passage-profile");
  }, [isAuthorized]);

  useEffect(() => {
    async function getLinksAsync() {
      try {
        const resp = await getLinks(userId, 0);
        console.log(resp.data);
        setShortedLinks(resp.data);
        setIsLinkTableLoading(false);
      } catch (error) {}
    }
    getLinksAsync();
  }, []);

  const signOut = async () => {
    try {
      await new PassageUser().signOut();
    } catch (error) {
    } finally {
      Router.push("/login");
    }
  };

  const handleSearch = debounce(async (text: string) => {
    setIsLinkTableLoading(true);
    console.log("Searching for:", text);
    const resp = await getLinks(userId, 0, text, selectedOption.value);
    console.log(resp.data);
    setShortedLinks(resp.data);
    setIsLinkTableLoading(false);
  }, 600);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    // setSearchText(text);
    handleSearch(text);
  };

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    console.log({ value });
    const option = options.find((opt) => opt.value === value);
    if (option) {
      setSelectedOption(option);
      setIsLinkTableLoading(true);
      const resp = await getLinks(userId, 0, "", option.value);
      console.log(resp.data);
      setShortedLinks(resp.data);
      setIsLinkTableLoading(false);
    }
  };

  const unauthorizedBody = (
    <Flex direction="column" maxW="600px" gap={8} className="m-auto">
      <Text>You have not logged in and cannot view the dashboard.</Text>
      <Flex w="fit-content" mx="auto">
        <CustomLink href="/login" text="Login" className="" />
      </Flex>
    </Flex>
  );

  return (
    <Flex direction="column" minH="100vh">
      {isAuthorized ? (
        <>
          {" "}
          <Header username={username} signOut={signOut} />
          <Flex className=" w-[96%]  items-center md:w-[90%] justify-between mx-auto my-5 overflow-scroll no-scrollbar ">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                w="260px"
                placeholder="Search Title"
                onChange={handleChange}
              />
            </InputGroup>
            <Select
              width="260px"
              fontSize={"sm"}
              value={selectedOption.value}
              onChange={handleSelectChange}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex className=" w-[96%] flex-col md:w-[90%] justify-center shadow-sm mx-auto mt-1 overflow-scroll no-scrollbar ">
            {!isLinkTableLoading && <ReusableTable data={shortedLinks} />}
          </Flex>
          {isLinkTableLoading && <Spinner className="mx-auto mt-6" />}
          {!isLinkTableLoading && shortedLinks.length == 0 && (
            <Text className=" text-2xl font-semibold mx-auto mt-5 text-gray-200 ">
              You have not added any links yet.
            </Text>
          )}
        </>
      ) : (
        unauthorizedBody
      )}
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context: GetServerSidePropsContext
) => {
  let userId;
  try {
    const { userID } =
      (await getAuthenticatedUserFromSession(context.req)) || {};

    if (userID) {
      userId = userID;
      const { email, phone, user_metadata } = await passage.user.get(userID);
      const identifier = email ? email : phone;
      return {
        props: {
          isAuthorized: true,
          username: identifier,
          appID: passage.appID,
          userId: userId ?? "",
        },
      };
    }
  } catch (error) {
    // authentication failed
  }
  return {
    props: {
      isAuthorized: false,
      username: "",
      appID: passage.appID,
      userId: userId ?? "",
    },
  };
};

export default Dashboard;
