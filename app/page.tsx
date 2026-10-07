import Link from 'next/link';
import { ArrowRight, BarChart3, BookOpenCheck, Check, FileSpreadsheet, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { Brand } from '@/components/Brand';

const features = [
  { icon: BookOpenCheck, title: 'Setoran super cepat', text: 'Catat ziyadah, murojaah, tajwid, makhraj, dan keputusan lanjut/ulang hanya dalam beberapa tap.' },
  { icon: Layers3, title: 'Murojaah terjaga', text: 'Hafalan lama tidak hilang dari perhatian. Lihat santri dan materi yang perlu diperkuat hari ini.' },
  { icon: FileSpreadsheet, title: 'Impor Excel cerdas', text: 'Masukkan daftar santri, riwayat setoran, atau nilai yang sudah berjalan tanpa memulai lagi dari nol.' },
  { icon: BarChart3, title: 'Rekap yang benar-benar berguna', text: 'Rekap mingguan, bulanan, beberapa bulan, semester, hingga tahun ajaran dalam Excel atau PDF.' },
];

export default function LandingPage() {
  return (
    <main>
      <header className="site-header shell">
        <Link href="/" className="brand-link"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#fitur">Fitur</a><a href="#cara">Cara kerja</a><a href="#harga">Harga</a>
        </nav>
        <div className="header-actions">
          <Link href="/demo" className="btn btn-ghost">Coba demo</Link>
          <Link href="/demo" className="btn btn-primary">Buka HafalKita <ArrowRight size={16} /></Link>
        </div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15}/> Dibuat untuk ritme kerja guru tahfidz</div>
          <h1>Setoran lebih cepat.<br/><span>Murojaah lebih terjaga.</span></h1>
          <p>HafalKita membantu ustadz dan ustadzah mencatat hafalan, melihat progres setiap santri, mengelola target, dan menyusun rekap tanpa tenggelam di buku catatan atau file Excel yang terpisah-pisah.</p>
          <div className="hero-actions">
            <Link href="/demo" className="btn btn-primary btn-large">Jelajahi mode demo <ArrowRight size={18}/></Link>
            <a href="#harga" className="btn btn-soft btn-large">Lihat harga</a>
          </div>
          <div className="trust-row">
            <span><Check size={15}/> Mobile-first</span>
            <span><Check size={15}/> Impor Excel</span>
            <span><Check size={15}/> Rekap semester</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Pratinjau dashboard HafalKita">
          <div className="visual-glow" />
          <div className="phone-shell">
            <div className="phone-top"><Brand compact/><span className="demo-chip">DEMO</span></div>
            <div className="phone-greeting"><span>Selamat datang kembali</span><strong>Ustadzah Fitri</strong></div>
            <div className="phone-summary">
              <div><strong>18</strong><span>Sudah setor</span></div>
              <div><strong>5</strong><span>Murojaah</span></div>
              <div><strong>82%</strong><span>Target pekan</span></div>
            </div>
            <div className="preview-card featured">
              <div><span className="preview-label">KELAS 3A • HARI INI</span><strong>Setoran berjalan dengan baik</strong></div>
              <span className="progress-ring">18/26</span>
            </div>
            <div className="preview-section-title"><strong>Perlu perhatian</strong><span>Lihat semua</span></div>
            <div className="student-mini"><span className="avatar">AF</span><div><strong>Ahmad Fauzan</strong><small>Al-Fajr 1–20 • 7 hari belum ziyadah</small></div><span className="status-dot warning"/></div>
            <div className="student-mini"><span className="avatar">MR</span><div><strong>Muhammad Rayyan</strong><small>Al-A’la 1–10 • perlu murojaah ulang</small></div><span className="status-dot danger"/></div>
          </div>
        </div>
      </section>

      <section className="signal-strip">
        <div className="shell signal-grid">
          <div><strong>Setor</strong><span>Catat hafalan tanpa form panjang.</span></div>
          <div><strong>Jaga</strong><span>Murojaah tidak lagi terlewat.</span></div>
          <div><strong>Pantau</strong><span>Progres santri mudah dipahami.</span></div>
        </div>
      </section>

      <section id="fitur" className="section shell">
        <div className="section-heading"><span>Fitur inti</span><h2>Satu ruang kerja untuk seluruh perjalanan hafalan.</h2><p>Fokus pada pekerjaan yang benar-benar dilakukan guru tahfidz setiap hari.</p></div>
        <div className="feature-grid">
          {features.map(({icon: Icon,title,text}) => <article className="feature-card" key={title}><div className="icon-box"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="cara" className="section shell workflow-section">
        <div className="workflow-copy"><span className="section-kicker">Alur yang masuk akal</span><h2>Dari setoran hari ini sampai rapor semester.</h2><p>Data dicatat sekali, lalu HafalKita menggunakannya untuk progres, murojaah, target, dan rekap. Tidak ada input ulang hanya demi membuat laporan.</p><div className="workflow-list"><span><b>01</b> Catat setoran</span><span><b>02</b> Jadwalkan penguatan</span><span><b>03</b> Pantau target</span><span><b>04</b> Unduh rekap</span></div></div>
        <div className="report-card">
          <div className="report-head"><div><small>REKAP SEMESTER GANJIL</small><strong>Aisyah Rahma</strong></div><span>2026/2027</span></div>
          <div className="report-score"><strong>88%</strong><span>Capaian target</span></div>
          <div className="report-bars"><label>Kelancaran <span>92</span></label><i style={{'--value':'92%'} as React.CSSProperties}/><label>Tajwid <span>87</span></label><i style={{'--value':'87%'} as React.CSSProperties}/><label>Makhraj <span>89</span></label><i style={{'--value':'89%'} as React.CSSProperties}/></div>
          <div className="report-footer"><ShieldCheck size={18}/><span>Riwayat asli tetap tersimpan dan dapat diedit.</span></div>
        </div>
      </section>

      <section id="harga" className="section pricing-shell shell">
        <div className="pricing-card">
          <div className="pricing-copy"><span className="section-kicker">Harga sederhana</span><h2>HafalKita untuk satu guru.</h2><p>Kelola beberapa halaqah, santri, setoran, murojaah, target, impor Excel, dan rekap dalam satu ruang kerja.</p><ul><li><Check size={17}/> Multi-halaqah</li><li><Check size={17}/> Impor data berjalan</li><li><Check size={17}/> Rekap bulanan & semester</li><li><Check size={17}/> Riwayat hafalan tersimpan</li></ul></div>
          <div className="price-box"><span>Satu lisensi guru</span><div><small>Rp</small><strong>99.000</strong></div><p>Sekali beli untuk produk HafalKita.</p><Link href="/demo" className="btn btn-primary btn-large">Coba sebelum membeli <ArrowRight size={18}/></Link></div>
        </div>
      </section>

      <footer className="site-footer shell"><Brand/><p>HafalKita membantu guru menjaga perjalanan hafalan santri dengan lebih rapi.</p><span>Produk digital oleh Teman Digital.</span></footer>
    </main>
  );
}
