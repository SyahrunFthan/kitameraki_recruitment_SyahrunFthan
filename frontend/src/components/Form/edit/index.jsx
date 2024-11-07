import { DatePicker } from "@fluentui/react";
import { Button, Input, Tag, Textarea } from "@fluentui/react-components";
import { Dropdown } from "@fluentui/react";
import moment from "moment";
import React from "react";

const EditComponents = ({
  formData,
  setFormData,
  handleAddTag,
  handleSubmit,
  priorityOptions,
  statusOptions,
  handleBack,
  formError,
  data,
  handleRemoveTag,
}) => {
  return (
    <div className="flex justify-start items-center h-full w-full bg-white flex-col p-10">
      <h2 className="text-2xl font-bold mb-4">Edit Tugas {data.title}</h2>
      <div className="border border-gray-200 shadow-md flex flex-col max-w-[860px] w-full p-8 rounded">
        <form action="">
          <div className="mb-3">
            <div className="flex flex-col w-full">
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter task title"
                required
              />
              {formError.title && (
                <span className="text-red-500">{formError.title}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <DatePicker
              label="Due Date"
              onSelectDate={(e) => {
                setFormData({
                  ...formData,
                  dueDate: moment(e, "YYYY-MM-DD").format("YYYY-MM-DD"),
                  date: e,
                });
              }}
              required
              placeholder="Select a date..."
              className="w-full"
              value={formData.date}
            />
            {formError.dueDate && (
              <span className="text-red-500">{formError.dueDate}</span>
            )}
          </div>
          <div className="mb-3 flex items-center w-full gap-4">
            <div className="flex flex-col w-full">
              <Dropdown
                label="Priority"
                placeholder="Select Priority"
                className="w-full"
                selectedKey={formData.priority}
                options={priorityOptions}
                onChange={(e, option) =>
                  setFormData({ ...formData, priority: option.key })
                }
              />
              {formError.priority && (
                <span className="text-red-500">{formError.priority}</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Dropdown
                label="Status"
                selectedKey={formData.status}
                onChange={(e, option) =>
                  setFormData({ ...formData, status: option.key })
                }
                options={statusOptions}
                placeholder="Select Status"
                required
                className="w-full"
              />
              {formError.status && (
                <span className="text-red-500">{formError.status}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <Textarea
              label="Description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description"
              required
              className="w-full"
            />
            {formError.description && (
              <span className="text-red-500">{formError.description}</span>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-2">Tags</label>
            <div className="flex mb-2 gap-4">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  value={formData.tagInput || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tagInput: e.target.value })
                  }
                  placeholder="Enter tag"
                  className="w-full"
                />
                {formError.tags && (
                  <span className="text-red-500">{formError.tags}</span>
                )}
              </div>
              <Button
                appearance="primary"
                onClick={handleAddTag}
                className="ml-2"
              >
                Add Tag
              </Button>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded px-2 py-1"
                >
                  <Tag key={index} removeable>
                    {tag}
                  </Tag>
                  <Button
                    appearance="link"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center w-full gap-4 mt-2">
              <Button
                type="submit"
                appearance="primary"
                className="w-full mt-4"
                onClick={handleSubmit}
              >
                Simpan Data
              </Button>
              <Button
                type="submit"
                appearance="primary"
                className="w-full mt-4"
                style={{
                  backgroundColor: "#FFC300",
                }}
                onClick={handleBack}
              >
                Kembali
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComponents;
