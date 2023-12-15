const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/get-all-repos', async (req, res) => {
    const response = await fetch('https://api.github.com/search/repositories?q=created:2019-01-10&sort=stars&order=desc');
    const data = await response.json();
    res.send(data.items);
});