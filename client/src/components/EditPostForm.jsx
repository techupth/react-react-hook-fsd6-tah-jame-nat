import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditPostForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const params = useParams();
  const handleInputChange = (e) => {
    const tmpForm = { ...form };
    tmpForm[e.target.name] = e.target.value;
    setForm(tmpForm);
  };
  const fetchFormDataFromServer = async () => {
    const result = await axios.get(`http://localhost:4000/posts/${params.id}`);
    setForm(result.data.data);
  };
  const putFormDataToServer = async () => {
    const result = await axios.put(
      `http://localhost:4000/posts/${params.id}`,
      form
    );
    // console.log(result);

    navigate("/");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    putFormDataToServer();
    navigate("/");
  };
  useEffect(() => {
    fetchFormDataFromServer();
  }, [params.id]);
  return (
    <form className="post-form" onSubmit={handleFormSubmit}>
      <h1>Edit Post Form</h1>
      <div className="input-container">
        <label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            placeholder="Enter title here"
            onChange={handleInputChange}
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
            value={form.content}
            onChange={handleInputChange}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditPostForm;
