import { useState } from "react";
import AxiosClient from "../AxiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import ErrorMessage from "../components/ErrorMessage";

export default function Post() {
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

    const payload = { ...form, user_id: user.id };
    console.log(payload);
    AxiosClient.post('/blog', payload)
      .then(() => {
        setMessage("Post successfully uploaded!");
        navigateTo("/users");
      })
      .catch(error => {
        const response = error.response;
        if ([403, 422].includes(response?.status)) {
          setErrors(response.data.errors);
          console.log(errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
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
            max="100"
          />
          <textarea 
            onChange={ onChange }
            id="content"
            placeholder="Write your post here..."
            rows="25"
            max="5000"
          ></textarea>
          <button className="btn btn-block" type="submit">Upload Post</button>
        </form>
      </div>
    </div>
  );
};