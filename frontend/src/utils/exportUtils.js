export function exportToCSV(filename, rows, headers = null) {
  if (!rows || !rows.length) return;

  const keys = headers ? headers : Object.keys(rows[0]);
  const csvContent = [
    keys.join(','),
    ...rows.map(row =>
      keys.map(key => {
        let cell = row[key] === null || row[key] === undefined ? '' : row[key];
        cell = cell.toString().replace(/"/g, '""');
        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerPDFPrint() {
  window.print();
}
