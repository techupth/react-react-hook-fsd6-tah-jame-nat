import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreatePostForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const handleFormInput = (e) => {
    const tmpForm = { ...form };
    tmpForm[e.target.name] = e.target.value;
    setForm(tmpForm);
  };
  const postFormDataToServer = async () => {
    const result = await axios.post(`http://localhost:4000/posts`, form);
    console.log(result);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    postFormDataToServer();
    navigate("/");
  };
  return (
    <form className="post-form" onSubmit={handleFormSubmit}>
      <h1>Create Post Form</h1>
      <div className="input-container">
        <label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={handleFormInput}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Content
          <textarea
            id="content"
            name="content"
            type="text"
            placeholder="Enter content here"
            onChange={handleFormInput}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreatePostForm;
