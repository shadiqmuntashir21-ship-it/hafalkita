import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`select now() as now, current_database() as database`;
    return NextResponse.json({ ok: true, database: rows[0]?.database, at: rows[0]?.now });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    );
  }
}
