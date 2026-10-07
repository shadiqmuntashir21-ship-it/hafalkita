import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HafalKita — Ruang Kerja Digital Guru Tahfidz',
  description: 'Setoran lebih cepat, murojaah lebih terjaga, dan perkembangan hafalan santri lebih mudah dipantau.',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0D6B56',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
