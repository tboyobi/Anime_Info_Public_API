import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const base_URL = "https://api.jikan.moe/v4/anime?q=";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { anime: null, error: null });
});

app.post("/name", async (req, res) => {
  const animeName = req.body.animeName;
  try {
    const response = await axios.get(
      `${base_URL}${(animeName)}`
    );
    const anime = response.data.data[0]; 

    res.render("index.ejs", {
      anime: {
        name: anime.title,
        id: anime.mal_id,
        episodes: anime.episodes,
        summary: anime.synopsis,
      },
      error: null,
    });
  } catch (error) {
    console.error("Error fetching anime:", error.message);
    res.render("index.ejs", {
      anime: null,
      error: "Could not fetch anime details. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
