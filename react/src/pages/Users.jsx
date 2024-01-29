import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setLoading(true);
    AxiosClient.get("/users")
      .then(({data}) => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <></>
  );
};