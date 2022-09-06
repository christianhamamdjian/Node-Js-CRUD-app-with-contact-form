const http = require("http");
const port = 3000;
const hostname = "localhost";

const students = [
  {
    name: "Susansa",
    gender: "female",
    country: "Finland"
  },
  {
    name: "Jaya",
    gender: "Male",
    country: "Finland"
  },
  {
    name: "Shora",
    gender: "male",
    country: "Finland"
  }
];

http
  .createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/" || req.url === "/home") {
      res.writeHead(200, { "Content-Type": "text/text" });
      res.write("This is the home page.");
      res.end();
    } else if (req.url === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("This is the about page");
      res.end();
    } else if (req.url === "/students") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(students));
      res.end();
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server is running on ${port}...`);
  });
