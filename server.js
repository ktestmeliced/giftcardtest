const express = require("express");
const path = require("path");

const app = express();

// Sert tous les fichiers du dossier (CSS, JS, images...)
app.use(express.static(__dirname));

// Affiche le bon cadeau
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "template.html"));
});

// Test de l'API
app.get("/ping", (req, res) => {
    res.json({
        status: "ok",
        message: "Serveur opérationnel"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});