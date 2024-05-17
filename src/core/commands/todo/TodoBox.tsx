import React from "react";
import MyDayjs from "@/plugins/myDayjs";

interface TodoBoxProps {
  today: boolean;
}

function TodoBox(props: TodoBoxProps) {
  const { today } = props;

  // const { taskList, deleteTask } = useTodoStore();

  return <div>TodoBox</div>;
}

export default TodoBox;
