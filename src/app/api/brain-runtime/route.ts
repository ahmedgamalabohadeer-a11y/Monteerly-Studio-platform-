import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

type BrainManifest = {
  generated_at?: string;
  last_checked_at?: string;
  last_rebuilt_at?: string;
  generator_version?: string;
  script_path?: string;
  script_sha256?: string;
  canonical_source?: string;
  canonical_source_sha256?: string;
  system_state_sha256?: string;
  excerpt_chars?: number;
  source_chars?: number;
  source_lines?: number;
  constitution_path?: string;
  execution_state_path?: string;
  found_count?: number;
  missing_count?: number;
  status?: string;
  needs_rebuild?: boolean;
};

export async function GET() {
  try {
    const manifestPath = path.join(process.cwd(), '.docs', 'runtime', 'brain.manifest.json');
    const raw = await fs.readFile(manifestPath, 'utf-8');
    const data = JSON.parse(raw) as BrainManifest;

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to load brain runtime manifest';

    return NextResponse.json(
      {
        ok: false,
        error: message,
        path: '.docs/runtime/brain.manifest.json',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
