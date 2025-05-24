// index.js (ES Module)
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 3000;

// Replace this with a real API endpoint that accepts an anime name query
const base_URL = "https://api.jikan.moe/v4/anime?q=";

// Needed to use __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { anime: null, error: null });
});

app.post("/name", async (req, res) => {
  const animeName = req.body.animeName;
  try {
    const response = await axios.get(
      `${base_URL}${encodeURIComponent(animeName)}`
    );
    const anime = response.data.data[0]; // Take the first result

    res.render("index", {
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
    res.render("index", {
      anime: null,
      error: "Could not fetch anime details. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
