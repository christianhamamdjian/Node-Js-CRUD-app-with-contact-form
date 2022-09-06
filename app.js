const http = require("http");
const fs = require("fs");
const os = require("os");
const ip = require("ip");
const url = require("url");

const port = 8080;
const hostname = "127.0.0.1";

const navigation =
  "<a href='/'>Home</a> <a href='/about'>About</a> <a href='/contact'>Contact</a>";

http
  .createServer((req, res) => {
    const user = os.hostname();
    const pageUrl = req.url;
    const checkingTime = Date.now();

    if (req.url === "/" || req.url === "/home") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
      });
    } else if (req.url === "/about") {
      fs.readFile("about.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
      });
    } else if (req.url === "/thankyou") {
      fs.readFile("thankyou.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
      });
    } else if (req.url === "/contact") {
      fs.readFile("contact.html", (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(navigation);
        res.write(data);
        res.end();
      });
    } else if (req.url.includes("name")) {
      res.writeHead(200, { "Content-Type": "text/html" });

      const adr = req.url;
      const q = url.parse(adr, true);

      const qdata = q.query;
      const firstname = qdata.firstname;
      const lastname = qdata.lastname;
      const email = qdata.email;
      const message = qdata.message;

      const emailMessage = `User name: ${firstname} ${lastname}\n email: ${email}\n message: ${message}\n From page: ${pageUrl}\n User ip: ${ip.address()}\n Sending time: ${checkingTime}\n\n`;

      var nodemailer = require("nodemailer");

      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "me@gmail.com",
          pass: "mypassword"
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let HelperOptions = {
        from: '"Me" <me@gmail.com',
        to: "me@welho.com",
        subject: "NodeJs CRUD app",
        text: `${emailMessage}`
      };
      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
        res.write(`<h1>Thank you!</h1>
    <h2>Your message was successfuly sent.</h2>
    <h3>We'll get back to you soon.</h3>`);
        res.end();
      });

      const formcontent = `User name: ${firstname}  ${lastname}\n user ip:${ip.address()}\n checking time: ${checkingTime}\n email: ${email}\n message: ${message}\n\n`;
      fs.appendFile("track.user.txt", formcontent, e => {
        if (e) {
          console.log(e);
        }
        console.log("form content saved");
      });
    } else {
    }

    const content = `User: ${user} user ip: ${ip.address()} checking time: ${checkingTime} checked page: ${pageUrl}\n\n`;

    fs.appendFile("track.user.activity.txt", content, e => {
      if (e) {
        console.log(e);
      }
      console.log("content saved");
    });
  })

  .listen(port, hostname, () => {
    console.log(`Server is running on ${port}...`);
  });
