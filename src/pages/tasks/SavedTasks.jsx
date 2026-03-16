import { DocumentPlusIcon } from "@heroicons/react/24/outline";
// import { createSavedTask, deleteSavedTask } from "../../services/apis/savedTasks";
import { useToggleSave } from "../../hooks/savedTasks/useToggleSave";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

function SavedTasks({ styles, task }) {
  const queryClient = useQueryClient();
  const savedtasks = queryClient.getQueryData(["savedtasks"]) || [];
  console.log("savedtasks from saved tasks jsx",savedtasks)
  const savedtaskids = savedtasks.map((t) => t.task._id);
  const isSaved = savedtaskids.includes(task._id);

  const { mutate: toggleSave } = useToggleSave();

  function handleSaveClick(e) {
    e.stopPropagation();
    toggleSave({ task, isSaved });
  }

  return (
    <DocumentPlusIcon
      className={isSaved ? `${styles.SaveIcon} ${styles.saved}` : styles.SaveIcon}
      onClick={handleSaveClick}
    />
  );
}

export default React.memo(SavedTasks);
