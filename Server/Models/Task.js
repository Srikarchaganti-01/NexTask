const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title of Task is required"],
      trim: true,
      maxlength: [20, "Title cannot exceed 10 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["nil", "low", "med", "top", "imp"],
      default: "nil",
    },
    category: {
      type: String,
      enum: ["assigned_to", "assigned_by", "self"],
      default: "self",
    },
    access: {
      type: String,
      enum: ["all", "self", "top_ord", "level_ord", "low_ord", "user", "admin"],
      default: "all",
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "working", "overdue", "alloted"],
      default: "alloted",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

TaskSchema.pre("save", async function (next) {
  console.log("Pre  : Saving tasks to db");
});

TaskSchema.post("save", async function (doc) {
  console.log(`post : task with title ${doc.title} is saved `);
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
