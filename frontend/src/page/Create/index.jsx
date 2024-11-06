import React, { useState } from "react";
import Layout from "../Layout";
import { CreateComponents, Header, Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { postDataTask } from "../../utils";
import Swal from "sweetalert2";

const Create = () => {
  const navigate = useNavigate();
  // State Data
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "",
    status: "",
    tags: [],
    tagInput: "",
  });
  const [formError, setFormError] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    tags: "",
  });

  // option priority
  const priorityOptions = [
    { key: "Low", text: "Low" },
    { key: "Medium", text: "Medium" },
    { key: "High", text: "High" },
  ];

  // option status
  const statusOptions = [
    { key: "Todo", text: "Todo" },
    { key: "In Progress", text: "In Progress" },
    { key: "Completed", text: "Completed" },
  ];

  // Handle Back
  const handleBack = () => {
    navigate("/");
  };

  // Handle Add Tag
  const handleAddTag = () => {
    if (formData.tagInput && !formData.tags.includes(formData.tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput],
        tagInput: "",
      });
    }
  };

  // Save data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await postDataTask(formData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      if (error.response.data.error == "title")
        return setFormError({ title: error.response.data.message });
      if (error.response.data.error == "dueDate")
        return setFormError({ dueDate: error.response.data.message });
      if (error.response.data.error == "priority")
        return setFormError({ priority: error.response.data.message });
      if (error.response.data.error == "status")
        return setFormError({ status: error.response.data.message });
      if (error.response.data.error == "description")
        return setFormError({ description: error.response.data.message });
      if (error.response.data.error == "tags")
        return setFormError({ tags: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove), // Remove the tag
    });
  };

  return (
    <Layout>
      <CreateComponents
        formData={formData}
        setFormData={setFormData}
        priorityOptions={priorityOptions}
        statusOptions={statusOptions}
        handleBack={handleBack}
        handleAddTag={handleAddTag}
        handleSubmit={handleSubmit}
        formError={formError}
        handleRemoveTag={handleRemoveTag}
      />

      {loading && <Loading />}
    </Layout>
  );
};

export default Create;
