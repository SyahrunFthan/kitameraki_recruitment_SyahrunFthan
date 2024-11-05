const { Schema, default: mongoose } = require("mongoose");
const { v4 } = require("uuid");

const SchemaTask = new Schema(
  {
    id: {
      type: String,
      default: v4,
      required: true,
      unique: true,
      description: "Unique identifier for the task",
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
      description: "Title of the task",
    },
    description: {
      type: String,
      maxlength: 1000,
      description: "Description of the task",
    },
    dueDate: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid date format!`,
      },
      description: "Due date and time for the task",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      description: "Priority level of the task",
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Completed"],
      required: true,
      description: "Status of the task",
    },
    tags: {
      type: [String],
      maxlength: 50,
      description: "Tags associated with the task",
    },
  },
  {
    timestamps: true, // Menyimpan createdAt dan updatedAt otomatis
    versionKey: false, // Menghilangkan __v field
  }
);

module.exports = mongoose.model("Task", SchemaTask);
