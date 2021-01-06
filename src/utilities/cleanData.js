export default {
  removeTag(data, props, tag) {
    switch (tag) {
      case "p":
        data[props] = data[props].replace(/<p>/g, "");
        data[props] = data[props].replace(/<\/p>/g, "");
        break;

      case "emstrong":
        data[props] = data[props].replace(/<em><strong>/g, " ");
        data[props] = data[props].replace(/<\/strong><\/em>/g, " ");

        data[props] = data[props].replace(/<strong><em>/g, " ");
        data[props] = data[props].replace(/<\/em><\/strong>/g, " ");

        data[props] = data[props].replace(/<strong>/g, " ");
        data[props] = data[props].replace(/<\/strong>/g, " ");
        break;

      case "quote":
        data[props] = data[props].replace(/&quot;/g, '"');
        data[props] = data[props].replace(/&nbsp;/g, " ");
        break;

      default:
        break;
    }
  },
  cleanTestCase(originalData) {
    let cleanedData = originalData;
    cleanedData.forEach((data, index) => {
      this.removeTag(data, "Test Plan", "p");
      data.index = index + 1;
    });
    return cleanedData;
  },
  cleanStep(originalData) {
    let cleanedData = originalData;
    cleanedData.forEach((data, index) => {
      this.removeTag(data, "Test Plan", "p");
      this.cleanColumn(data, "action");
      this.cleanColumn(data, "expected result");
      data.index = index + 1;
    });
    return cleanedData;
  },
  async cleanColumn(data, props) {
    if (data[props].includes("ghost")) {
      let msg = data[props];
      while (msg.includes("ghost")) {
        try {
          const regexp = /[0-9]?\d+/g;
          const array = [...msg.matchAll(regexp)];
          array[0] = array[0][0];
          array[1] = array[1][0];
          array[2] = array[2][0];

          let response = await fetch(
            `/api/getGhostString?step=${array[0]}&tc=${array[1]}`
          );
          let result = await response.json();
          msg = result[0][props];
        } catch (error) {
          console.error(error);
        }
      }
      data[props] = msg;
    }
    if (data[props].includes("<p>")) {
      this.removeTag(data, props, "p");
      this.removeTag(data, props, "emstrong");
      this.removeTag(data, props, "quote");
    }
  },
};
