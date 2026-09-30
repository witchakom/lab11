import { Check, Pencil, Trash2 } from 'lucide-react';
import EditField from './EditField.jsx';
import { PRIORITIES } from '../constants.js';

export default function TodoItem({
  todo,
  editing,
  editText,
  onEditText,
  onToggle,
  onRemove,
  onStartEdit,
  onCommit,
  onCancel,
  onBlurSave,
  onCycle,
}) {
  return (
    <li className={'todo' + (todo.leaving ? ' leaving' : '')}>
      <div className="todo-clip">
        <div
          className={
            'card todo-row flex items-start gap-3 px-3.5 py-3 sm:px-4' + (todo.done ? ' is-done' : '')
          }
        >
          <button
            type="button"
            role="checkbox"
            className="check mt-[3px]"
            aria-checked={todo.done}
            aria-label={(todo.done ? 'ทำเครื่องหมายว่ายังไม่เสร็จ: ' : 'ทำเครื่องหมายว่าเสร็จแล้ว: ') + todo.text}
            onClick={() => onToggle(todo.id)}
          >
            <Check size={14} strokeWidth={3} aria-hidden="true" />
          </button>

          <div className="min-w-0 flex-1">
            {editing ? (
              <EditField
                value={editText}
                onChange={onEditText}
                onCommit={onCommit}
                onCancel={onCancel}
                onBlurSave={onBlurSave}
              />
            ) : (
              <span
                className={'todo-text' + (todo.done ? ' done' : '')}
                title="ดับเบิลคลิกเพื่อแก้ไข"
                onDoubleClick={() => onStartEdit(todo)}
              >
                {todo.text}
              </span>
            )}
            <button
              type="button"
              className={'badge mt-1.5 pr-' + todo.priority}
              title="คลิกเพื่อเปลี่ยนระดับความสำคัญ"
              aria-label={'ความสำคัญ' + PRIORITIES[todo.priority] + ' (คลิกเพื่อเปลี่ยน)'}
              onClick={() => onCycle(todo.id)}
            >
              {PRIORITIES[todo.priority]}
            </button>
          </div>

          <div className="flex flex-none items-center">
            <button
              type="button"
              className="icon-btn"
              aria-label="แก้ไขงาน"
              title="แก้ไข"
              onClick={() => onStartEdit(todo)}
            >
              <Pencil size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn danger"
              aria-label="ลบงาน"
              title="ลบ"
              onClick={() => onRemove(todo.id)}
            >
              <Trash2 size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
