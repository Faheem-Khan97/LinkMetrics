"use client";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import { AppProps, LoginProps } from "@components/utils/types";
import { getAuthenticatedUserFromSession } from "@components/utils/passage";
import { PassageLogin } from "@components/components/login";
import Link from "next/link";
import { CustomLink } from "@components/components/primaryLink";
import Image from "next/image";
import Services from "@components/components/Services";
import Footer from "@components/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage<LoginProps> = ({ isAuthorized, userID }) => {
  return (
    <>
      <Head>
        <title>Link Metrics</title>
        <meta name="description" content="Manage and Track Shorten Link FREE" />
        <meta name="description" content=" Shorten Your Link FREE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/LinkMetrics.svg" />
      </Head>
      <main className="px-8  min-h-[100vh] flex flex-col ">
        <Flex justify="space-between " alignItems="center">
          <Image
            alt="Link Metrics Logo"
            src={"/LinkMetrics.svg"}
            width="80"
            height="60"
          />
          <CustomLink href="/login" text="Get Started" className=" h-fit" />
        </Flex>

        <Text
          fontSize="5xl"
          className="font-extrabold max-w-[650px] mt-8 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 text-transparent to-pink-500 bg-clip-text "
        >
          LINK METRICS
        </Text>
        <Text className=" text-sm sm:text-normal md:text-xl max-w-[650px] mt-1 mx-auto bg-gradient-to-r from-pink-700 via-purple-600 text-transparent to-pink-300 bg-clip-text ">
          A ALL-IN-ONE Link Management Tool For Creators and Learners.
        </Text>
        <Flex className=" gap-6 mt-10 shadow-sm flex-col pl-4 lg:flex-row ">
          <Flex className="max-w-[400px] ">
            <Services />
          </Flex>
          <Flex className="w-fit flex-1 mx-auto  border-gray-100  border">
            <Image
              alt="Link Metrics Logo"
              src={"/dashboardn.png"}
              width="1100"
              height="260"
              loading="eager"
            />
          </Flex>
        </Flex>
        <Flex direction="column">
          <Text className="text-lg md:text-3xl font-bold max-w-[650px] mt-8 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 text-transparent to-pink-500 bg-clip-text ">
            Shorten Links In One Click For FREE, Always!
          </Text>
          <Flex className="w-fit flex-1 mx-auto mt-10 border-gray-100  border">
            <Image
              alt="Link Metrics Logo"
              src={"/add.png"}
              width="1100"
              height="260"
            />
          </Flex>
        </Flex>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context: GetServerSidePropsContext
) => {
  const loginProps = await getAuthenticatedUserFromSession(context.req);

  return {
    props: {
      isAuthorized: loginProps?.isAuthorized ?? false,
      userID: loginProps?.userID ?? "",
    },
  };
};

export default Home;
