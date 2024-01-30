import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosClient from "../AxiosClient";
import Markdown from "react-markdown";

export default function Blog() {
  const [loading, setLoading] = useState(true);
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
        console.error(error);
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
          <h1 id="post-title">{ blog.title }</h1>
          <span>By { blog.user.name }</span>
          <hr />
          <div>
            <Markdown>{ blog.content }</Markdown>
          </div>
        </>
      }
    </div>
  );
};