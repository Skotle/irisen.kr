import express from "express";
import path from "path";


const __dirname = path.resolve();
const app = express();

console.log(__dirname);


app.use(express.static("frontend"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/webhome.html");
});

app.get("/temp", (req, res) => {
    res.sendFile(__dirname + "/frontend/src/html/temp.html");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
