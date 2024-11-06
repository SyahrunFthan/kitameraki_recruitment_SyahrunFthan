import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { EditComponents, Loading } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { getDataById, updateDataTask } from "../../utils";
import Swal from "sweetalert2";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // State Data
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateDataTask(id, formData);
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

  // Get Data By Id
  const AmbilDataById = async () => {
    try {
      const response = await getDataById(id);
      setData(response.data.response);
      setFormData({
        title: response.data.response.title,
        description: response.data.response.description,
        dueDate: new Date(response.data.response.dueDate),
        tags: response.data.response.tags,
        priority: response.data.response.priority,
        status: response.data.response.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AmbilDataById();
  }, []);

  // Remove Tag
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove), // Remove the tag
    });
  };

  return (
    <Layout>
      <EditComponents
        formData={formData}
        setFormData={setFormData}
        priorityOptions={priorityOptions}
        statusOptions={statusOptions}
        handleBack={handleBack}
        handleAddTag={handleAddTag}
        handleSubmit={handleSubmit}
        formError={formError}
        data={data}
        handleRemoveTag={handleRemoveTag}
      />

      {loading && <Loading />}
    </Layout>
  );
};

export default Edit;
