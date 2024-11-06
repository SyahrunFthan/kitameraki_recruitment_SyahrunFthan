import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Button, Input, Spinner } from "@fluentui/react-components";
import { Add20Regular, SearchRegular } from "@fluentui/react-icons";
import { Header, List, Loading, Pagination } from "../../components";
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
      <div className="flex justify-start items-center h-full w-full bg-white flex-col p-10">
        <div className="flex flex-col min-w-[510px] max-w-[1200px] gap-4 w-full">
          <div className="flex items-center justify-between w-full justify mb-4">
            <Header text={"Syahrun Fathan Hidayah | List Tugas"} />
            <div className="flex flex-row items-center gap-3">
              <Input
                contentBefore={<SearchRegular />}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={() => navigate("/create")}
                appearance="primary"
                icon={<Add20Regular />}
              >
                Tambah Data
              </Button>
            </div>
          </div>
          <List
            currentPage={page}
            limit={limit}
            tasks={tasks}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDelete(id)}
          />
          <Pagination totalPages={totalPage} onPageChange={setPage} />
        </div>
      </div>
      {loading && <Loading />}
    </Layout>
  );
};

export default Home;
