const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. Pobranie portu z środowiska Railway lub domyślny 3000
// Railway często ustawia PORT na 8080 lub 3000. Ten kod obsłuży oba.
const PORT = process.env.PORT || 3000;

// Funkcja serwowania pliku HTML
const serveFile = (res, filePath) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};

// 2. Stworzenie serwera
const server = http.createServer((req, res) => {
    // Główna strona
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, path.join(__dirname, 'index.html'));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// 3. Uruchomienie na dynamicznym porcie
server.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
    console.log(`Dostępny pod adresem: https://mobbyn-website-production.up.railway.app`);
});
