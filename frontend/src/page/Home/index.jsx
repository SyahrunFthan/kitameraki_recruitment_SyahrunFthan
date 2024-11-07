import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { HomeComponents, Loading } from "../../components";
import { deleteDataTask, getDataTask } from "../../utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Ambil Data Task
  const getTasks = async () => {
    try {
      const response = await getDataTask(limit, page, search);
      setTasks(response.data.response);
      setTotalPage(response.data.totalPages);
      setPage(response.data.currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  // Render Function
  useEffect(() => {
    getTasks();
  }, [page, search]);

  // Handle Edit
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await deleteDataTask(id);
          if (response.status == 204) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Data Berhasil di Hapus",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            }).then(() => {
              getTasks();
            });
          }
        } catch (error) {
          if (error.response.status == 404) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          } else {
            console.log(error.response.data);
          }
        } finally {
          setLoading(false);
        }
      }
    });
  };
  return (
    <Layout>
      <HomeComponents
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        limit={limit}
        tasks={tasks}
        onEdit={(id) => handleEdit(id)}
        onDelete={(id) => handleDelete(id)}
        totalPage={totalPage}
        onClick={() => navigate("/create")}
        page={page}
      />
      {loading && <Loading />}
    </Layout>
  );
};

export default Home;
