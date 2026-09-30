import { useEffect, useRef } from 'react';

export default function EditField({ value, onChange, onCommit, onCancel, onBlurSave }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.focus();
      const n = el.value.length;
      el.setSelectionRange(n, n);
    }
  }, []);

  return (
    <input
      ref={ref}
      className="edit-input"
      value={value}
      maxLength={120}
      aria-label="แก้ไขงาน"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') onCommit();
        else if (e.key === 'Escape') onCancel();
      }}
      onBlur={onBlurSave}
    />
  );
}
