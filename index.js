import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const base_URL = "https://api.animechan.io/v1/anime";
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/name", async (req, res) => {
  const { name } = req.body;
  try {
    const response = await axios.get(`${base_URL}/${name}`);
    const anime = response.data;
    res.render("index.ejs", {
      name: anime.name,
      episode: anime.episode,
      summary: anime.summary,
      id: anime.id
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});