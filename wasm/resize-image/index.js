const ATTRIBUTE_TO_INT = ["stop_sequence", "pickup_type", "drop_off_type"];

const csvToJson = (csv) => {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",").map((header) => header.trim());

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      if (ATTRIBUTE_TO_INT.includes(headers[j])) {
        const num = Number.parseInt(currentline[j]);
        if (!Number.isNaN(num)) {
          obj[headers[j]] = num;
          continue;
        }
      }
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
};

const sortByStopId = (arr) => arr?.sort((item) => item.stop_id);
