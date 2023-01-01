const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json()); // Middleware

app.get("/", (req, res) => {
  res.end("This is a home page");
});

app.get("/data", (req, res) => {
  res.end("This is whole data");
});

app.get("/allData", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");

  console.log(JSON.parse(data));
  res.end("Consoled data in the terminal");
});

app.get("/allChildren", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsed_data = JSON.parse(data);
  console.log(parsed_data.childrens);
  res.send("Consoled childrens data in the terminal");
});

//to add data into db.json
app.post("/addData", (req, res) => {
  // 1. First we need to read the file
  const data = fs.readFileSync("./db.json", "utf-8");

  // 2. We need to parse it
  const parsed_data = JSON.parse(data);

  // 3. Manipulating the data or adding the data
  parsed_data.childrens.push(req.body);

  // 4. Write the data in the db.json
  fs.writeFileSync("./db.json", JSON.stringify(parsed_data))
  console.log(parsed_data)
  res.send("Data base updated");
});


app.post("/addParent", (req, res) => {
    const data = fs.readFileSync("./db.json", "utf-8")

    const parsed_data = JSON.parse(data)

    parsed_data.parents.push(req.body)

    fs.writeFileSync("./db.json", JSON.stringify(parsed_data))

    res.end("Parent data added")
})

app.listen(5500, () => {
  console.log("Listening on port 5500");
});
