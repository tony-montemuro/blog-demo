import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosClient from "../AxiosClient";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    AxiosClient.get(`/blog/${id}`)
      .then(({ data }) => {
        setBlog(data);
        console.log(data);
      })
      .catch(error => {
        setErrors(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="card animated fadeInDown">
      { loading ?
        <div className="text-center">Loading...</div>
      :
        <>
          <h1>{ blog.title }</h1>
          <span>By { blog.user.name }</span>
          <hr />
          <div>
            { blog.content }
          </div>
        </>
      }
    </div>
  );
};