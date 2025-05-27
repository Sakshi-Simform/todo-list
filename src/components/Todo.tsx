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
    <div className="Todo">
      <div onClick={() => toggleComplete(task.id)} style={{ cursor: 'pointer' }}>
        <p className={task.completed ? "completed" : "incompleted"}>
          {task.task}
        </p>
      </div>

      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};