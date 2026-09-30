import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import TodoItem from './components/TodoItem.jsx';
import {
  LEAVE_MS,
  PRIORITIES,
  PRIORITY_ORDER,
  PRIORITY_TOKEN,
  SEED_TODOS,
} from './constants.js';

const EMPTY_MESSAGES = {
  all: 'ยังไม่มีงานในรายการ\nพิมพ์ชื่องานด้านบนแล้วกด Enter เพื่อเพิ่มงานแรก',
  active: 'ไม่มีงานที่ค้างอยู่ เยี่ยมมาก!',
  completed: 'ยังไม่มีงานที่ทำเสร็จ',
};

export default function App() {
  const [todos, setTodos] = useState(SEED_TODOS);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const nextId = useRef(SEED_TODOS.length + 1);
  const inputRef = useRef(null);
  const skipBlur = useRef(false);

  const live = todos.filter((t) => !t.leaving);
  const remaining = live.filter((t) => !t.done).length;
  const doneCount = live.length - remaining;

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );

  const addTodo = () => {
    const v = text.trim();
    if (!v) {
      inputRef.current?.focus();
      return;
    }
    setTodos((prev) => [
      { id: nextId.current++, text: v, done: false, priority, leaving: false },
      ...prev,
    ]);
    setText('');
    inputRef.current?.focus();
  };

  const toggle = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const cyclePriority = (id) =>
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              priority:
                PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(t.priority) + 1) % PRIORITY_ORDER.length],
            }
          : t
      )
    );

  const removeTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setTodos((prev) => prev.filter((t) => t.id !== id)), LEAVE_MS);
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.map((t) => (t.done ? { ...t, leaving: true } : t)));
    setTimeout(() => setTodos((prev) => prev.filter((t) => !t.done)), LEAVE_MS);
  };

  const startEdit = (t) => {
    skipBlur.current = false;
    setEditingId(t.id);
    setEditText(t.text);
  };

  const saveEdit = () => {
    if (editingId === null) return;
    const v = editText.trim();
    if (v) setTodos((prev) => prev.map((t) => (t.id === editingId ? { ...t, text: v } : t)));
    setEditingId(null);
  };

  const commitEdit = () => {
    skipBlur.current = true;
    saveEdit();
  };

  const abortEdit = () => {
    skipBlur.current = true;
    setEditingId(null);
  };

  const blurSave = () => {
    if (skipBlur.current) {
      skipBlur.current = false;
      return;
    }
    saveEdit();
  };

  const today = new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const tabs = [
    { key: 'all', label: 'ทั้งหมด', count: live.length },
    { key: 'active', label: 'ยังไม่เสร็จ', count: remaining },
    { key: 'completed', label: 'เสร็จแล้ว', count: doneCount },
  ];

  return (
    <main className="mx-auto w-full max-w-xl px-4 pb-16 pt-8 sm:pt-14">
      <header className="mb-5">
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight">รายการงาน</h1>
        <p className="muted mt-1 text-sm">{today}</p>
      </header>

      <section className="card mb-5 p-4" aria-label="เพิ่มงานใหม่">
        <div className="flex gap-2.5">
          <input
            ref={inputRef}
            className="text-input"
            type="text"
            value={text}
            maxLength={120}
            placeholder="วันนี้ต้องทำอะไรบ้าง?"
            aria-label="ชื่องานใหม่"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) addTodo();
            }}
          />
          <button type="button" className="btn-primary" onClick={addTodo}>
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
            <span>เพิ่มงาน</span>
          </button>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-2" role="group" aria-label="ระดับความสำคัญ">
          <span className="muted mr-1 text-[13px]">ความสำคัญ</span>
          {PRIORITY_ORDER.map((p) => {
            const token = PRIORITY_TOKEN[p];
            return (
              <button
                key={p}
                type="button"
                className={'seg pr-' + p}
                style={
                  priority === p
                    ? { background: `var(--${token}-bg)`, color: `var(--${token}-fg)` }
                    : undefined
                }
                aria-pressed={priority === p}
                onClick={() => setPriority(p)}
              >
                {PRIORITIES[p]}
              </button>
            );
          })}
        </div>
      </section>

      <div className="tabs mb-4" role="tablist" aria-label="กรองรายการงาน">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            className="tab"
            aria-selected={filter === t.key}
            onClick={() => setFilter(t.key)}
          >
            <span>{t.label}</span>
            <span className="count">{t.count}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty" style={{ whiteSpace: 'pre-line' }}>
          {EMPTY_MESSAGES[filter]}
        </div>
      ) : (
        <ul className="m-0 list-none p-0">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              editing={editingId === t.id}
              editText={editText}
              onEditText={setEditText}
              onToggle={toggle}
              onRemove={removeTodo}
              onStartEdit={startEdit}
              onCommit={commitEdit}
              onCancel={abortEdit}
              onBlurSave={blurSave}
              onCycle={cyclePriority}
            />
          ))}
        </ul>
      )}

      <footer className="mt-3 flex items-center justify-between gap-3">
        <p className="m-0 text-[15px] font-medium" aria-live="polite">
          เหลืออีก {remaining} งาน
        </p>
        <button type="button" className="link-btn" disabled={doneCount === 0} onClick={clearCompleted}>
          ล้างงานที่เสร็จแล้ว{doneCount > 0 ? ` (${doneCount})` : ''}
        </button>
      </footer>

      {live.length > 0 && (
        <p className="muted mt-6 text-center text-[13px] leading-relaxed">
          ดับเบิลคลิกที่ข้อความหรือแตะไอคอนดินสอเพื่อแก้ไข
          <br />
          คลิกป้ายความสำคัญเพื่อเปลี่ยนระดับ
        </p>
      )}
    </main>
  );
}
