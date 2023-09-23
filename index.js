import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("today.ejs", {
        dateToday: today,
        todayTasks: todayTasks,
        year: year,
    })
    
})

function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    return formattedDate;
  }

let year = new Date().getFullYear();

const today = getCurrentDate();

const todayTasks = [];

app.post("/today/add", (req, res) => {

    const taskAdd = req.body["todayTask"];

    if (taskAdd) {
        todayTasks.push(taskAdd);
    }

    res.render("today.ejs", {
        dateToday: today,
        todayTasks: todayTasks,
        year: year,
    })
    
})

const workTasks = [];

app.post("/work/add", (req, res) => {

    const taskAdd = req.body["workTask"];

    if (taskAdd) {
        workTasks.push(taskAdd);
    }

    res.render("work.ejs", {
        dateToday: today,
        workTasks: workTasks,
        year: year,
    })
    
})

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        dateToday: today,
        workTasks: workTasks,
        year: year,
    })
})

app.get("/today", (req, res) => {
    res.render("today.ejs", {
        dateToday: today,
        todayTasks: todayTasks,
        year: year,
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });