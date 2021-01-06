import jsonexport from "jsonexport";

const download = (filename, text) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const downloadCSV = (data) => {
  jsonexport(data, (err, csv) => {
    if (err) return console.error(err);
    download(`${"TCExecutionNotes"}-${Date.now()}.csv`, csv);
  });
};

export default () => {
  return {
    downloadCSV,
  };
};
