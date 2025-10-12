import { useAxios } from "../../hooks";

const Axios = () => {
  const { data, loading, error } = useAxios({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  console.log(data, loading, error);

  return <div className="dashboard-container"></div>;
};

export default Axios;
