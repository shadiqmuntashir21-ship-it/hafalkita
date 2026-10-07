'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { ArrowLeft, BarChart3, BookOpenCheck, CalendarDays, ChevronDown, Download, FileSpreadsheet, Home, MoreHorizontal, RotateCcw, Search, Sparkles, Target, Upload, UsersRound, X } from 'lucide-react';
import { Brand } from './Brand';
import { demoStudents, memorizationMap } from '@/lib/demo-data';

type Tab = 'beranda'|'setoran'|'santri'|'progres'|'lainnya';

const recent = [
  {name:'Aisyah Rahma', material:'Al-Balad 1–15', type:'Ziyadah', score:92, time:'08.12'},
  {name:'Zahra Nabila', material:'Asy-Syams 1–15', type:'Murojaah', score:90, time:'08.06'},
  {name:'Ahmad Fauzan', material:'Al-Fajr 1–20', type:'Ziyadah', score:84, time:'07.54'},
];

export function DemoDashboard(){
  const [tab,setTab]=useState<Tab>('beranda');
  const [search,setSearch]=useState('');
  const [importOpen,setImportOpen]=useState(false);
  const [rows,setRows]=useState<Record<string,unknown>[]>([]);
  const filtered=useMemo(()=>demoStudents.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())),[search]);

  function handleFile(file?: File){
    if(!file) return;
    const reader=new FileReader();
    reader.onload=(e)=>{
      const data=e.target?.result;
      const wb=XLSX.read(data,{type:'array'});
      const sheet=wb.Sheets[wb.SheetNames[0]];
      setRows(XLSX.utils.sheet_to_json<Record<string,unknown>>(sheet,{defval:''}).slice(0,8));
    };
    reader.readAsArrayBuffer(file);
  }

  function downloadTemplate(){
    const ws=XLSX.utils.json_to_sheet([{NIS:'2026001',NISN:'0012345678','Nama Santri':'Contoh Santri',Kelas:'3A',Halaqah:'Halaqah A'}]);
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Santri');
    XLSX.writeFile(wb,'Template_Impor_Santri_HafalKita.xlsx');
  }

  function exportRecap(){
    const ws=XLSX.utils.json_to_sheet(recent.map(r=>({'Nama Santri':r.name,Materi:r.material,Jenis:r.type,Nilai:r.score,Waktu:r.time})));
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Rekap');
    XLSX.writeFile(wb,'Rekap_Demo_HafalKita_Oktober_2026.xlsx');
  }

  return <div className="app-shell">
    <aside className="app-sidebar">
      <div className="sidebar-brand"><Link href="/"><Brand/></Link><span className="demo-chip">MODE DEMO</span></div>
      <div className="teacher-card"><span className="teacher-avatar">UF</span><div><strong>Ustadzah Fitri</strong><small>SDIT Cahaya Insani</small></div><ChevronDown size={16}/></div>
      <nav className="sidebar-nav">
        <Nav icon={Home} label="Beranda" active={tab==='beranda'} onClick={()=>setTab('beranda')}/>
        <Nav icon={BookOpenCheck} label="Setoran" active={tab==='setoran'} onClick={()=>setTab('setoran')}/>
        <Nav icon={UsersRound} label="Santri" active={tab==='santri'} onClick={()=>setTab('santri')}/>
        <Nav icon={BarChart3} label="Progres" active={tab==='progres'} onClick={()=>setTab('progres')}/>
        <Nav icon={MoreHorizontal} label="Lainnya" active={tab==='lainnya'} onClick={()=>setTab('lainnya')}/>
      </nav>
      <div className="sidebar-note"><Sparkles size={18}/><div><strong>Tip hari ini</strong><span>5 santri punya jadwal murojaah yang perlu dituntaskan.</span></div></div>
      <Link href="/" className="back-link"><ArrowLeft size={16}/> Kembali ke landing page</Link>
    </aside>

    <main className="app-main">
      <header className="app-topbar">
        <div><span className="topbar-label">HALAQAH AKTIF</span><button className="halaqah-switch">Kelas 3A • 26 Santri <ChevronDown size={15}/></button></div>
        <div className="top-actions"><button className="icon-action" title="Cari"><Search size={19}/></button><button className="btn btn-primary" onClick={()=>setTab('setoran')}><BookOpenCheck size={17}/> Catat setoran</button></div>
      </header>

      <div className="app-content">
        {tab==='beranda' && <Overview onImport={()=>setImportOpen(true)} onExport={exportRecap}/>}
        {tab==='setoran' && <Setoran/>}
        {tab==='santri' && <Students search={search} setSearch={setSearch} students={filtered} onImport={()=>setImportOpen(true)}/>}
        {tab==='progres' && <Progress/>}
        {tab==='lainnya' && <More onImport={()=>setImportOpen(true)} onExport={exportRecap}/>}
      </div>
    </main>

    <nav className="mobile-nav">
      <Nav icon={Home} label="Beranda" active={tab==='beranda'} onClick={()=>setTab('beranda')}/>
      <Nav icon={BookOpenCheck} label="Setoran" active={tab==='setoran'} onClick={()=>setTab('setoran')}/>
      <Nav icon={UsersRound} label="Santri" active={tab==='santri'} onClick={()=>setTab('santri')}/>
      <Nav icon={BarChart3} label="Progres" active={tab==='progres'} onClick={()=>setTab('progres')}/>
      <Nav icon={MoreHorizontal} label="Lainnya" active={tab==='lainnya'} onClick={()=>setTab('lainnya')}/>
    </nav>

    {importOpen && <div className="modal-backdrop" onMouseDown={()=>setImportOpen(false)}>
      <div className="import-modal" onMouseDown={e=>e.stopPropagation()}>
        <div className="modal-head"><div><span className="section-kicker">SMART EXCEL IMPORTER</span><h3>Impor santri atau data berjalan</h3></div><button className="icon-action" onClick={()=>setImportOpen(false)}><X size={19}/></button></div>
        <p>Unggah file Excel. HafalKita akan membaca header dan menampilkan preview sebelum data benar-benar disimpan.</p>
        <div className="upload-zone"><Upload size={26}/><strong>Pilih file .xlsx atau .xlsm</strong><span>Data demo hanya dibaca di browser dan tidak disimpan.</span><input type="file" accept=".xlsx,.xlsm" onChange={e=>handleFile(e.target.files?.[0])}/></div>
        <div className="import-actions"><button className="btn btn-soft" onClick={downloadTemplate}><Download size={16}/> Download template</button>{rows.length>0 && <span className="success-note">{rows.length} baris preview terbaca</span>}</div>
        {rows.length>0 && <div className="table-wrap"><table><thead><tr>{Object.keys(rows[0]).map(k=><th key={k}>{k}</th>)}</tr></thead><tbody>{rows.slice(0,5).map((r,i)=><tr key={i}>{Object.values(r).map((v,j)=><td key={j}>{String(v)}</td>)}</tr>)}</tbody></table></div>}
      </div>
    </div>}
  </div>;
}

function Nav({icon:Icon,label,active,onClick}:{icon:any,label:string,active:boolean,onClick:()=>void}){
  return <button className={`nav-item ${active?'active':''}`} onClick={onClick}><Icon size={19}/><span>{label}</span></button>;
}

function Overview({onImport,onExport}:{onImport:()=>void,onExport:()=>void}){
  return <>
    <div className="page-title-row"><div><span className="page-eyebrow">SELASA, 7 OKTOBER 2026</span><h1>Assalamu’alaikum, Ustadzah Fitri.</h1><p>Berikut yang perlu diperhatikan dari halaqah Anda hari ini.</p></div><div className="page-actions"><button className="btn btn-soft" onClick={onImport}><FileSpreadsheet size={17}/> Impor Excel</button><button className="btn btn-soft" onClick={onExport}><Download size={17}/> Unduh rekap</button></div></div>
    <div className="metric-grid"><Metric n="18" label="Sudah setor" sub="dari 26 santri"/><Metric n="5" label="Murojaah hari ini" sub="2 prioritas tinggi"/><Metric n="82%" label="Target pekan" sub="naik 9% minggu ini"/><Metric n="3" label="Perlu perhatian" sub="butuh tindak lanjut"/></div>
    <div className="dashboard-grid">
      <section className="panel panel-large"><div className="panel-head"><div><span className="panel-kicker">AKTIVITAS TERBARU</span><h3>Setoran hari ini</h3></div><button className="text-button">Lihat semua</button></div><div className="activity-list">{recent.map((r,i)=><div className="activity-row" key={r.name}><span className="avatar muted">{['AR','ZN','AF'][i]}</span><div><strong>{r.name}</strong><small>{r.type} • {r.material}</small></div><span className="score-pill">{r.score}</span><time>{r.time}</time></div>)}</div></section>
      <section className="panel"><div className="panel-head"><div><span className="panel-kicker">MUROJAAH</span><h3>Perlu hari ini</h3></div><RotateCcw size={19}/></div><div className="review-card high"><strong>Ahmad Fauzan</strong><span>An-Naba 1–20</span><small>Terakhir 14 hari lalu</small></div><div className="review-card"><strong>Muhammad Rayyan</strong><span>Al-A’la 1–10</span><small>Hasil terakhir: perlu ulang</small></div></section>
    </div>
    <div className="dashboard-grid bottom">
      <section className="panel"><div className="panel-head"><div><span className="panel-kicker">TARGET PEKAN INI</span><h3>Perjalanan halaqah</h3></div><Target size={19}/></div><div className="big-progress"><strong>82%</strong><span>Target tercapai</span><i><b style={{width:'82%'}}/></i><small>21 dari 26 santri sesuai target pekan ini.</small></div></section>
      <section className="panel panel-large"><div className="panel-head"><div><span className="panel-kicker">PERLU PERHATIAN</span><h3>Jangan sampai terlewat</h3></div><CalendarDays size={19}/></div><div className="attention-grid"><Attention name="Fadhil Akbar" text="8 hari belum ziyadah" tone="amber"/><Attention name="Rayyan" text="3× hasil perlu ulang" tone="red"/><Attention name="Naila Putri" text="Target pekan tertinggal" tone="blue"/></div></section>
    </div>
  </>;
}

function Setoran(){
  const [index,setIndex]=useState(0);
  const s=demoStudents[index%demoStudents.length];
  return <>
    <div className="page-title-row"><div><span className="page-eyebrow">MODE SETORAN HALAQAH</span><h1>Catat tanpa memutus ritme.</h1><p>Simpan, lanjut ke santri berikutnya, atau lewati jika belum setor.</p></div><span className="count-chip">{index+1} / {demoStudents.length}</span></div>
    <div className="setoran-layout">
      <section className="panel setoran-card"><div className="student-focus"><span className="avatar big">{s.initials}</span><div><h2>{s.name}</h2><p>{s.current}</p></div></div><div className="form-grid"><Field label="Jenis setoran" options={['Ziyadah','Murojaah','Tahsin']}/><Field label="Surah" options={['Al-Balad','Al-Fajr','Al-Ghasyiyah']}/><Field label="Kelancaran" options={['Sangat Baik','Baik','Perlu Ulang']}/><Field label="Tajwid" options={['Baik','Perbaikan']}/><Field label="Makhraj" options={['Baik','Perbaikan']}/><Field label="Keputusan" options={['Lanjut','Ulang','Murojaah']}/></div><label className="note-field">Catatan opsional<textarea placeholder="Tambahkan catatan singkat untuk santri ini…"/></label><div className="setoran-actions"><button className="btn btn-soft" onClick={()=>setIndex((index+1)%demoStudents.length)}>Lewati</button><button className="btn btn-primary" onClick={()=>setIndex((index+1)%demoStudents.length)}>Simpan & berikutnya <BookOpenCheck size={17}/></button></div></section>
      <aside className="panel queue-panel"><span className="panel-kicker">ANTRIAN</span><h3>Santri berikutnya</h3>{demoStudents.map((x,i)=><div className={`queue-row ${i===index?'active':''}`} key={x.name}><span>{i+1}</span><div><strong>{x.name}</strong><small>{i<index?'Sudah diproses':i===index?'Sedang aktif':'Menunggu'}</small></div></div>)}</aside>
    </div>
  </>;
}

function Students({search,setSearch,students,onImport}:{search:string,setSearch:(v:string)=>void,students:typeof demoStudents,onImport:()=>void}){
  return <>
    <div className="page-title-row"><div><span className="page-eyebrow">26 SANTRI • KELAS 3A</span><h1>Santri & perjalanan hafalan.</h1><p>Data santri, posisi hafalan, dan status penguatan dalam satu pandangan.</p></div><button className="btn btn-soft" onClick={onImport}><FileSpreadsheet size={17}/> Impor dari Excel</button></div>
    <div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama santri…"/></div>
    <div className="student-grid">{students.map(s=><article className="student-card" key={s.name}><div className="student-card-top"><span className="avatar">{s.initials}</span><span className={`student-status ${s.status.toLowerCase().replace(' ','-')}`}>{s.status}</span></div><h3>{s.name}</h3><p>{s.current}</p><div className="student-progress"><span><b>{s.progress}%</b> target semester</span><i><b style={{width:`${s.progress}%`}}/></i></div><button className="text-button">Lihat perjalanan</button></article>)}</div>
  </>;
}

function Progress(){
  return <>
    <div className="page-title-row"><div><span className="page-eyebrow">PETA HAFALAN • JUZ 30</span><h1>Yang hafal, yang kuat, dan yang perlu dijaga.</h1><p>Bedakan “pernah disetor” dengan hafalan yang benar-benar sudah mutqin.</p></div><button className="btn btn-soft"><ChevronDown size={16}/> Juz 30</button></div>
    <div className="progress-layout"><section className="panel panel-large"><div className="legend"><span><i className="legend-dot mutqin"/>Mutqin</span><span><i className="legend-dot active"/>Sudah hafal</span><span><i className="legend-dot review"/>Perlu murojaah</span><span><i className="legend-dot empty"/>Belum</span></div><div className="surah-grid">{memorizationMap.map(([name,status],i)=><div className={`surah-card ${status}`} key={name}><span>{78+i}</span><strong>{name}</strong><small>{status==='mutqin'?'Mutqin':status==='active'?'Sudah hafal':status==='review'?'Perlu murojaah':'Belum dimulai'}</small></div>)}</div></section><aside className="panel"><span className="panel-kicker">RINGKASAN</span><h3>Kekuatan hafalan</h3><div className="stat-stack"><div><strong>12</strong><span>Surah mutqin</span></div><div><strong>3</strong><span>Perlu penguatan</span></div><div><strong>76</strong><span>Sesi murojaah</span></div></div></aside></div>
  </>;
}

function More({onImport,onExport}:{onImport:()=>void,onExport:()=>void}){
  const tools=[['Murojaah Planner','Atur penguatan hafalan yang jatuh tempo.',RotateCcw],['Target Hafalan','Target individu, halaqah, dan semester.',Target],['Tasmi’ & Munaqasyah','Kelola ujian hafalan dan hasilnya.',BookOpenCheck],['Rekap & Laporan','Bulanan, multi-bulan, semester, tahun ajaran.',BarChart3],['Impor Excel','Santri, riwayat setoran, dan nilai lama.',FileSpreadsheet],['Periode & Arsip','Tutup semester tanpa menghapus riwayat.',CalendarDays]];
  return <>
    <div className="page-title-row"><div><span className="page-eyebrow">PERANGKAT GURU</span><h1>Semua yang dibutuhkan, tanpa membuat aplikasi terasa ramai.</h1><p>Fitur lanjutan tetap mudah ditemukan saat dibutuhkan.</p></div></div>
    <div className="tool-grid">{tools.map(([title,text,Icon]:any)=><button className="tool-card" key={title} onClick={title==='Impor Excel'?onImport:title==='Rekap & Laporan'?onExport:undefined}><span className="icon-box"><Icon size={21}/></span><div><strong>{title}</strong><p>{text}</p></div></button>)}</div>
  </>;
}

function Metric({n,label,sub}:{n:string,label:string,sub:string}){return <div className="metric-card"><strong>{n}</strong><span>{label}</span><small>{sub}</small></div>}
function Attention({name,text,tone}:{name:string,text:string,tone:string}){return <div className="attention-card"><span className={`attention-dot ${tone}`}/><div><strong>{name}</strong><small>{text}</small></div></div>}
function Field({label,options}:{label:string,options:string[]}){const [v,setV]=useState(options[0]);return <label className="field"><span>{label}</span><select value={v} onChange={e=>setV(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>}
