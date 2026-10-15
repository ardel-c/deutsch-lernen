// Minimal RFC 4180 CSV parser: quoted fields, escaped quotes (""), commas and newlines inside quotes, CRLF, BOM
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  row.push(field);
  rows.push(row);

  return rows
    .map(unwrapSingleColumnRow)
    .filter(r => r.some(cell => cell.trim() !== ''));
}

// A file whose lines were pasted into one spreadsheet column comes back as a single quoted
// field per line ("word,noun,Arbeit,""work, job"",...") — parse that field again as its own line
function unwrapSingleColumnRow(row) {
  const filled = row.filter(cell => cell.trim() !== '');
  if (filled.length === 1 && row[0] === filled[0] && row[0].includes(',')) {
    return parseCsv(row[0])[0] || row;
  }
  return row;
}
