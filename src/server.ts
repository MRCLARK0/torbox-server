import express from "express";
import multer from 'multer';
import cors from 'cors';
import dotenv from "dotenv";
import TorboxAPI from './torbox';

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

const upload = multer();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

if (!process.env.TORBOX_TOKEN) {
    console.error("Missing TORBOX_TOKEN in .env");
    process.exit(1);
}

const torboxSDK = new TorboxAPI(process.env.TORBOX_TOKEN);

app.get("/status", (_req, res) => {
    res.json({ status: "up" });
});

app.get("/torbox/status", async (_req, res) => {
    try {
        const data = await torboxSDK.fetchUpStatus();
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch Torbox up status" });
    }
});

app.get("/torbox/user/me", async (_req, res) => {
    try {
        const data = await torboxSDK.fetchUserData();
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch Torbox user data" });
    }
});

app.post("/torbox/webdownload/create", upload.none(), async (req, res) => {
    console.log("Request Body:", req.body);
    const { link }  = req.body;

    if (!link) {
        return res.status(400).json({ error: "Link is required" });
    }

    try {
        const webDownloadData = await torboxSDK.createWebDownload(link);
        return res.status(201).json(webDownloadData);
    } catch (error) {
        console.error('Error creating web download:', error);
        return res.status(500).json({ error: "Failed to create web download" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});