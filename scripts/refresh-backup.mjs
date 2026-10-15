// Rebuilds data/drugs-backup.js from the live Google Sheet.
// Run by the "Refresh drug backup" GitHub Action, or by hand:  node scripts/refresh-backup.mjs
// (For testing you can set SHEET_CSV_FILE to a local .csv file instead of downloading.)
import { readFileSync, writeFileSync } from 'node:fs';

const SHEET_ID = '1MGGz9hqHF-PTv-Z35NzGfuIi7Hp5WAvj5cSWiv6emis';   // keep in sync with index.html
const SHEET_TAB = 'Drugs';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(SHEET_TAB)}`;
const OUT = new URL('../data/drugs-backup.js', import.meta.url);

// Reads CSV text (handles quotes, commas and line breaks inside cells). Same logic as index.html.
function parseCSV(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(x => x.trim() !== ''));
}
const fail = msg => { console.error('NOT UPDATED: ' + msg); process.exit(1); };

let text;
if (process.env.SHEET_CSV_FILE) text = readFileSync(process.env.SHEET_CSV_FILE, 'utf8');
else {
  const res = await fetch(SHEET_URL).catch(e => fail('could not reach the Google Sheet (' + e.message + ')'));
  if (!res.ok) fail('Google returned HTTP ' + res.status + '. Is the Sheet shared as "Anyone with the link: Viewer"?');
  text = await res.text();
}
const rows = parseCSV(text);
const head = rows[0] || [];
const body = rows.slice(1).filter(r => String(r[head.findIndex(h => /^generic$/i.test(h.trim()))] || '').trim());

// Safety checks: never replace a good backup with a broken one.
if (!head.some(h => /^generic$/i.test(h.trim()))) fail('no "Generic" column found (wrong tab, or the sheet is not shared).');
if (body.length < 50) fail('only ' + body.length + ' drugs found; expected about 249. Leaving the old backup in place.');

// Skip the write if nothing changed (so the Action doesn't make an empty commit every week).
let old = null;
try { old = JSON.parse(readFileSync(OUT, 'utf8').replace(/^window\.RX_BACKUP\s*=\s*/, '').replace(/;\s*$/, '')); } catch (e) {}
if (old && JSON.stringify(old.head) === JSON.stringify(head) && JSON.stringify(old.rows) === JSON.stringify(body)) {
  console.log('No changes: backup already matches the Sheet (' + body.length + ' drugs).');
  process.exit(0);
}
const snapshot = new Date().toISOString().slice(0, 10);
writeFileSync(OUT, 'window.RX_BACKUP = ' + JSON.stringify({ snapshot, head, rows: body }) + ';\n');
console.log('Backup updated: ' + body.length + ' drugs, snapshot ' + snapshot + '.');
