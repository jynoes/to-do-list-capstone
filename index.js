import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("today.ejs", {
        dateToday: today,
        tasks: tasks,
    })
    
})

function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    return formattedDate;
  }

const today = getCurrentDate();

const tasks = [];

app.post("/add", (req, res) => {
    const taskAdd = req.body["task"];

    if (taskAdd) {
        tasks.push(taskAdd);
    }

    res.render("today.ejs", {
        dateToday: today,
        tasks: tasks,

    })
    
})


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });