require("dotenv").config();
const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.json());

const URL = process.env.URL;
if (!URL) throw new Error("Missing ENV: URL");

app.get("/ping", (req, res) => {
    res.json({
        code: 200,
        message: "ok"
    });
});

app.get("/report", async (req, res) => {
    const name = req.query.name || null
    const version = req.query.version || null
    const content = req.query.content || null
    const typeReq = req.query.typeReq || null

    if (!name || !version || !content) {
        return res.json({
            code: 300,
            message: "Params missing!"
        });
    }

    if (typeReq === "bug") {
        const payload = {
            embeds: [
                {
                    title: "Bug Report",
                    description:
                        `**Name:    **\n${name}\n\n` +
                        `**Version: **\n${version}\n\n` +
                        `**Content: **\n${content}\n` + 
                        "__UniversalIdle__",
                    color: "111184"
                }
            ]
        };
    } else if (typeReq === "feedback") {
        const payload = {
            embeds: [
                {
                    title: "Feedback",
                    description:
                        `**Name:    **\n${name}\n\n` +
                        `**Version: **\n${version}\n\n` +
                        `**Content: **\n${content}\n` + 
                        "__UniversalIdle__",
                    color: "008000"
                }
            ]
        };
    }

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // console.log("Webhook status:", response.status);

        if (response.status === 204) {
            return res.json({
                code: 200,
                message: "Successfully sent!"
            });
        } else {
            console.warn(`Webhook couldnt be send.! ${response}`);0
            return res.json({
                code: 300,
                message: "Could not be sent!"
            });
        }
    } catch (err) {
        console.error(err);
        return res.json({
            code: 500,
            message: "Request failed!"
        });
    }
})

app.get("/submit", async (req, res) => {
    const name = req.query.name || null;
    const contact = req.query.contact || null;
    const content = req.query.content || null;

    if (!name || !contact || !content) {
        return res.json({
            code: 300,
            message: "Params missing!"
        });
    }

    const payload = {
        embeds: [
            {
                title: "New Submission!",
                description:
                    `**Name:    **\n${name}\n\n` +
                    `**Contact: **\n${contact}\n\n` +
                    `**Content: **\n${content}`,
                color: 830383
            }
        ]
    };

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // console.log("Webhook status:", response.status);

        if (response.status === 204) {
            return res.json({
                code: 200,
                message: "Successfully sent!"
            });
        } else {
            console.warn(`Webhook couldnt be send.! ${response}`);0
            return res.json({
                code: 300,
                message: "Could not be sent!"
            });
        }
    } catch (err) {
        console.error(err);
        return res.json({
            code: 500,
            message: "Request failed!"
        });
    }
});

const PORT = 5173;
app.listen(PORT, () => {
    console.log("Server running on port 5173");
});