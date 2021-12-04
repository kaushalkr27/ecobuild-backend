module.exports = {
  getRequestTest: function (url, callBack) {
    const https = require("https");
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
        //   data = JSON.parse(data);
        //   console.log("DATA: ");
        //   console.log(data);
          callBack(data);
        });
      })
      .on("error", (err) => {
        console.log(err.message);
      });
  },
};
