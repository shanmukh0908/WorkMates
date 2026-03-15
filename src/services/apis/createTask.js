import api from "./axios";

const createTask = async function (taskData, files) {
  console.log(taskData,"///***---",files)
  const formData = new FormData();
  formData.append("status", "open");
  formData.append("category", taskData.category);
  formData.append("taskDescription", taskData.taskDescription);
  formData.append("negotiable", taskData.negotiable);
  formData.append("amountOffered", taskData.amountOffered);
  

  if (taskData.taskLocation) {
    const [lat, lng] = taskData.taskLocation.split(",").map(Number);

    const taskLocation = {
      type: "Point",
      coordinates: [lng, lat],
      address: taskData.address || "",
    };

    console.log(taskLocation ,"from creating task")

    formData.append("taskLocation", JSON.stringify(taskLocation));
  }

  if (files && files.length > 0) {
    for (const file of files) {
      formData.append("images", file);
    }
  }

  console.log([...formData])

  try {
    const res = await api.post("/tasks", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Task creation successful");

    return res;
  } catch (err) {
    console.error("Task creation failed", err);
    throw err;
  }
};

export default createTask;
