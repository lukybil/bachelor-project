export const jsonToCsv = (data) => {
  const headers = ['completionTime', 'difficulty', 'username', 'firstName', 'lastName', 'email', 'profileImage'];
  let csv = headers.join(',').concat('\n');
  for (let i = 0; i < data.length; i++) {
    if (i % (data.length / 10) === 0) console.log(`converted ${i} rows`);
    let row = '';
    for (let j = 0; j < headers.length; j++) {
      row += data[headers[0]] + (j !== headers.length - 1) ? ',' : '\n';
    }
    csv += row;
  }
  return csv;
};
