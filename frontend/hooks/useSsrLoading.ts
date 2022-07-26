import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSsrLoadingContext } from "contexts/loading";

export const useSsrLoading = () => {
  const [loading, setLoading] = useState(false);
  const { samePageRef } = useSsrLoadingContext();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(() => {
        const isLoading = !samePageRef.current;
        samePageRef.current = false;
        return isLoading;
      });
    };

    const handleStop = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.query.id, router.query.serieId]);

  return { loading };
};
