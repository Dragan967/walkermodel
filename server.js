const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Koristi port koji Codespaces dodeli

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
