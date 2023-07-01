"use client";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import { LoginProps } from "@components/utils/types";
import { getAuthenticatedUserFromSession } from "@components/utils/passage";
import { PassageLogin } from "@components/components/login";
import Router from "next/router";

// const inter = Inter({ subsets: ["latin"] });

const LoginPage: NextPage<LoginProps> = ({ isAuthorized }) => {
  useEffect(() => {
    if (isAuthorized) {
      Router.push("/addlink");
    }
    require("@passageidentity/passage-elements/passage-auth");
  }, [isAuthorized]);
  return (
    <>
      <Head>
        <title>Link Metrics</title>
        <meta
          name="description"
          content="Shorten Link with Ease. Track shorten link analytics"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/LinkMetrics.svg" />
      </Head>
      <main className="p-8 min-h-[100vh] flex justify-center">
        <PassageLogin />
      </main>
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

export default LoginPage;
