import React from "react";
import { Button, Input } from "@fluentui/react-components";
import { Add20Regular, SearchRegular } from "@fluentui/react-icons";
import { Header, List, Pagination } from "../../components";

const HomeComponents = ({
  search,
  setSearch,
  page,
  limit,
  tasks,
  totalPage,
  setPage,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
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
              onClick={onClick}
              appearance="primary"
              icon={<Add20Regular />}
            >
              Tambah Data
            </Button>
          </div>
        </div>
        <List
          page={page}
          limit={limit}
          tasks={tasks}
          onEdit={(id) => onEdit(id)}
          onDelete={(id) => onDelete(id)}
        />
        <Pagination totalPages={totalPage} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default HomeComponents;
