import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/recommendation", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/recommendations/${id}`, {
        params: {
          limit: 10
        }
      }
    );
    let recommendations = response.data;

    res.render("index.ejs", { name: recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching anime details");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});