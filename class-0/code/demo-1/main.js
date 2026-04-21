// const foo3 = (msg, callback) => {
//   if (1 != 1) {
//     callback();
//   } else {
//     console.log(msg);
//     console.log("Error: Email not sent");
//   }
// };

// foo3("Email not sent", () => {
//   // do something
//   console.log("Sent Email done....");
// });

import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", (req, res) => {
  //call controller
  //res.send(data);
});

app.get("/my/name/is/:name", (req, res) => {
  res.send(`<h1>My name is ${req.params.name}</h1>`);
});

app.get("/products/:id", (req, res) => {
  res.send(`<h1>Product ${req.params.id}</h1>`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
