import { useState } from "react";
import AxiosClient from "../AxiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const navigateTo = useNavigate();
  const { user, setMessage } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    content: ""
  });
  const [errors, setErrors] = useState(null);

  const onChange = e => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setErrors(null);

    const payload = { ...form, user_id: user.id };
    AxiosClient.post('/blog', payload)
      .then(() => {
        setMessage("Post successfully uploaded!");
        navigateTo("/");
      })
      .catch(error => {
        const response = error.response;
        if ([403, 422].includes(response?.status)) {
          setErrors(response.data.errors);
          console.error(errors);
        }
      });
  };

  return (
    <div className="post-form animated fadeInDown">
      <div className="form">
        <form onSubmit={ onSubmit }>
          <h1 className="title">
            Create Post
          </h1>
          <ErrorMessage errors={ errors } />
          <input 
            onChange={ onChange } 
            id="title" 
            placeholder="Title" 
            type="text" 
            required
          />
          <textarea 
            onChange={ onChange }
            id="content"
            placeholder="Write your markdown post here..."
            rows="25"
            required
          ></textarea>
          <button className="btn btn-block" type="submit">Upload Post</button>
        </form>
      </div>
    </div>
  );
};