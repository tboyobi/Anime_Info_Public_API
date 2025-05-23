import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
// const apiKey = process.env.API_KEY;
// if (!apiKey) {
//   console.error("API key is not set. Please set the API_KEY environment variable.");
//   process.exit(1);
// }

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/search", async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
    const anime = response.data;
    res.render("index.ejs", { anime });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime data");
  }
});

// Move the /characters route outside of the /anime/:id handler
app.post("/characters", async (req, res) => {
  const { id } = req.body; // Use req.body to get id from POST body
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
    const characters = response.data;
    res.render("characters.ejs", { characters });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime details");
  }
});
app.post("/episodes", async (req, res) => {
  const { id } = req.body; // Use req.body to get id from POST body
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/episodes`
    );
    const episodes = response.data;
    res.render("episodes.ejs", { episodes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime details");
  }
});
app.post("/recommendation", async (req, res) => {
  const { id } = req.body; // Use req.body to get id from POST body
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/recommendations`
    );
    const recommendations = response.data;
    res.render("recommendation.ejs", { recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime details");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});