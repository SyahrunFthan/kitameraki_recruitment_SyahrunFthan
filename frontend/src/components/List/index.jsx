import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  TableCellLayout,
  Button,
  Tooltip,
} from "@fluentui/react-components";
import { EditRegular, DeleteRegular } from "@fluentui/react-icons";
import { Stack } from "@fluentui/react";
import React from "react";
import moment from "moment";

const List = ({ tasks, currentPage, limit, onEdit, onDelete }) => {
  // Set Column Table
  const columns = [
    { key: "number", label: "No" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "date", label: "Due Date" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "tags", label: "Tag" },
    { key: "action", label: "#" },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.key}>
              <h2 className="text-lg font-semibold">{column.label}</h2>
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>
                <TableCellLayout>
                  {(currentPage - 1) * limit + index + 1}
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{task.title}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{task.description}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  {moment(task.dueDate, "YYYY-MM-DD").format("DD MMMM YYYY")}
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{task.priority}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{task.status}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  <ul>
                    {task.tags.map((tag, index) => (
                      <li key={index}>
                        {index + 1}. {tag}
                      </li>
                    ))}
                  </ul>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <Stack
                  horizontal
                  tokens={{ childrenGap: 10 }}
                  verticalAlign="center"
                >
                  <Tooltip content="Edit Data" relationship="label">
                    <Button
                      icon={<EditRegular />}
                      onClick={() => onEdit(task._id)}
                    />
                  </Tooltip>
                  <Tooltip content="Hapus Data" relationship="label">
                    <Button
                      icon={<DeleteRegular />}
                      onClick={() => onDelete(task._id)}
                    />
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableCell>
            <TableCellLayout></TableCellLayout>
          </TableCell>
        )}
      </TableBody>
    </Table>
  );
};

export default List;
