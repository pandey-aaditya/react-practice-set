import { useEffect } from "react";
import { useAxios, usePolling } from "../../hooks";
import { useState } from "react";

const Polling = () => {
  const [pollingDelay, setPollingDelay] = useState(1000);

  const { data, loading, error, refetch } = useAxios(
    {
      url: "https://jsonplaceholder.typicode.com/posts",
    },
    false
  );

  usePolling(() => refetch(), pollingDelay);

  useEffect(() => {
    if (data) setPollingDelay(null);
  }, [data]);

  return <div></div>;
};

export default Polling;
