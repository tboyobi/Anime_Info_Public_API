import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/search", async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
    const anime = response.data;
    res.render("results", { anime });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime data");
  }
});
app.get("/anime/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    const animeDetails = response.data;
    res.render("animeDetails", { animeDetails });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime details");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});