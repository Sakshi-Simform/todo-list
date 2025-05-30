import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { TodoItem } from '../types/todo.types';

export interface TodoProps {
  task: TodoItem;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
}

export const Todo: React.FC<TodoProps> = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo" >
      <input
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={(e) => {
          e.stopPropagation(); 
          toggleComplete(task.id);
        }}
        aria-label={`Mark task "${task.task}" as completed`}
      />

      <p className={task.completed ? "completed" : "incompleted"}>
        {task.task}
      </p>

      <div className="editdelete-icon">
        {!task.completed && (
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={() => editTodo(task.id)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
        )}
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
