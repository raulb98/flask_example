import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { useSession } from "../hooks/useSession";
import { api } from "../utils/api";

const Success: NextPage = () => {
  const router = useRouter();
  const sessionId = useRouter().query.session_id as string;
  const { setSession } = useSession();

  const session = api.payment.getStripeSession.useQuery(
    { sessionId },
    {
      enabled: router.isReady,
      refetchInterval: 2000,
    }
  );

  useEffect(() => {
    if (session.data?.email) {
      setSession(session.data.email);
      router.push("/dlc").catch(console.error);
    }
  }, [setSession, session.data, router]);

  return (
    <>
      <Head>
        <title>Payment Success!</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-white">
        <Spinner />
        Validating payment...
      </main>
    </>
  );
};

export default Success;
