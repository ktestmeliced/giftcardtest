const express = require("express");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "template.html"));
});


app.post("/generate", async (req, res) => {

    try {

        const {
            sender,
            recipient,
            amount,
            message
        } = req.body;


        let html = fs.readFileSync(
            path.join(__dirname, "template.html"),
            "utf8"
        );


        html = html.replace(
            "Thomas",
            sender
        );

        html = html.replace(
            "Marie",
            recipient
        );

        html = html.replace(
            "100 €",
            amount + " €"
        );

        html = html.replace(
            "Joyeux anniversaire ❤️",
            message
        );


        const tempFile = path.join(
            __dirname,
            "temp.html"
        );

        fs.writeFileSync(
            tempFile,
            html
        );


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });


        const page = await browser.newPage();


        await page.setViewport({
            width: 2000,
            height: 1048
        });


        await page.goto(
            "file://" + tempFile,
            {
                waitUntil: "networkidle0"
            }
        );


        const pdf = await page.pdf({
            width: "2000px",
            height: "1048px",
            printBackground: true,
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        });


        await browser.close();


        fs.unlinkSync(tempFile);


        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=bon-cadeau.pdf"
        );


        res.send(pdf);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `🚀 Serveur lancé sur le port ${PORT}`
    );

});