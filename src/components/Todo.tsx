import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { TodoItem } from '../types/todo.types';

export interface TodoProps {
  task: TodoItem;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  // onChangeTask: (id: string, newTask: string) => void;
  // onSaveEdit: (id: string) => void;
}

export const Todo: React.FC<TodoProps> = ({
  task,
  deleteTodo,
  editTodo,
  toggleComplete,
  // onChangeTask,
 
}) => {
  return (
    <div className="Todo">
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

      {task.isEditing ? (
        <textarea
          className="todo-update"
          value={task.task}
          onChange={(e) => onChangeTask(task.id, e.target.value)}
        />
        
      ) : (
        <div className="tooltip-wrapper">
          <p className={task.completed ? "completed" : "incompleted"}>
            {task.task}
          </p>
          {task.task.length > 30 && (
            <span className="tooltip-text">{task.task}</span>
          )}
        </div>
      )}

      <div className="editdelete-icon">
        {!task.completed && !task.isEditing && (
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