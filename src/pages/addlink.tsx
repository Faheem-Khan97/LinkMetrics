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
  Divider,
  Flex,
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
import { DashboardProps, LinkData, addFormData } from "@components/utils/types";
import ReusableTable from "@components/components/ReusableTable";
import { getLinks } from "@components/utils";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Header from "@components/components/Header";

const AddLink: NextPage<DashboardProps> = ({
  isAuthorized,
  username,
  appID,
  userId,
}) => {
  const [shortedLinks, setShortedLinks] = useState<LinkData[]>([]);
  const [isLinkTableLoading, setIsLinkTableLoading] = useState(true);
  const [isShotening, setIsShotening] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/login");
    }
    require("@passageidentity/passage-elements/passage-profile");
  }, [isAuthorized]);

  const unauthorizedBody = (
    <Flex direction="column" maxW="600px" gap={8} className="m-auto">
      <Text>You have not logged in and cannot view the dashboard.</Text>
      <Flex w="fit-content" mx="auto">
        <CustomLink href="/login" text="Login" className="" />
      </Flex>
    </Flex>
  );

  const signOut = async () => {
    try {
      await new PassageUser().signOut();
    } catch (error) {
    } finally {
      Router.push("/login");
    }
  };

  useEffect(() => {
    async function getLinksAsync() {
      try {
        const resp = await getLinks(userId, 4);
        console.log(resp.data);
        setShortedLinks(resp.data);
        setIsLinkTableLoading(false);
      } catch (error) {}
    }
    getLinksAsync();
  }, []);

  const submitCallBack = async (data: addFormData) => {
    const { title, link } = data;
    setIsShotening(true);
    try {
      const res = await axios.post(
        "/api/short-url",
        {
          title,
          userId,
          link,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Updating the links table",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const inserted = res.data.data.inserted;
      if (res.data.data.inserted) {
        const shortedLinksCopy = [inserted, ...shortedLinks];
        if (shortedLinksCopy.length > 5) {
          shortedLinksCopy.pop();
          setShortedLinks(shortedLinksCopy);
        } else {
          setShortedLinks(shortedLinksCopy);
        }
      }
    } catch (error: any) {
      console.log({ error });
      console.error(`An error occurred:${error?.message}`, error);
    } finally {
      setIsShotening(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      {isAuthorized ? (
        <>
          <Header username={username} signOut={signOut} />
          <Flex mt={1}>
            <AddLinkForm
              submitCallback={submitCallBack}
              loading={isShotening}
            />
          </Flex>
          <Divider width={"94%"} className="mx-auto my-8 " />
          <Flex className=" w-[96%]  items-center md:w-[90%] justify-between mx-auto my-5 overflow-scroll no-scrollbar ">
            <Text fontSize="sm">Recently Added Links are shown here.</Text>
            <CustomLink className="" href="/dashboard" text="VIEW ALL">
              <ChevronRightIcon boxSize={4} color="white" className="m-auto" />
            </CustomLink>
          </Flex>
          <Flex className=" w-[96%] flex-col md:w-[90%] justify-center shadow-sm mx-auto mt-1 overflow-scroll no-scrollbar ">
            <ReusableTable data={shortedLinks} />
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
      console.log({ user_metadata });
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

export default AddLink;
