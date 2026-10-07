export const demoStudents = [
  { name: 'Aisyah Rahma', progress: 88, current: 'Al-Balad 1–15', status: 'Mutqin', initials: 'AR' },
  { name: 'Ahmad Fauzan', progress: 74, current: 'Al-Fajr 1–20', status: 'Murojaah', initials: 'AF' },
  { name: 'Fadhil Akbar', progress: 61, current: 'Al-Ghasyiyah 1–12', status: 'Berjalan', initials: 'FA' },
  { name: 'Zahra Nabila', progress: 92, current: 'Asy-Syams selesai', status: 'Mutqin', initials: 'ZN' },
  { name: 'Muhammad Rayyan', progress: 69, current: 'Al-A’la 1–10', status: 'Perlu ulang', initials: 'MR' },
];

export const memorizationMap = [
  ['An-Naba', 'mutqin'],
  ['An-Nazi’at', 'mutqin'],
  ['Abasa', 'mutqin'],
  ['At-Takwir', 'review'],
  ['Al-Infitar', 'active'],
  ['Al-Mutaffifin', 'empty'],
  ['Al-Insyiqaq', 'empty'],
  ['Al-Buruj', 'empty'],
] as const;
