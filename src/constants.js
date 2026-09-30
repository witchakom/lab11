export const PRIORITIES = {
  low: 'ต่ำ',
  medium: 'ปานกลาง',
  high: 'สูง',
};

export const PRIORITY_ORDER = ['low', 'medium', 'high'];

// CSS variable prefix used by each priority (see index.css)
export const PRIORITY_TOKEN = { low: 'low', medium: 'med', high: 'high' };

export const LEAVE_MS = 280;

export const SEED_TODOS = [
  { id: 1, text: 'ส่งรายงานสรุปยอดขายประจำสัปดาห์', done: false, priority: 'high', leaving: false },
  { id: 2, text: 'ซื้อของเข้าบ้าน: นม ไข่ ผักสด', done: false, priority: 'low', leaving: false },
  { id: 3, text: 'นัดหมอฟันตรวจประจำปี', done: true, priority: 'medium', leaving: false },
];
