import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Proxy ruta za Systeme.io API
app.post("/api/proxy", async (req, res) => {
    const { first_name, email } = req.body;

    if (!first_name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const apiUrl = "https://api.systeme.io/contact";
    const apiKey = process.env.SYSTEME_API_KEY;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ first_name, email, tags: ["Welcome"], automation: true })
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});