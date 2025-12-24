const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/data");
    const states = response.data.states;

    let listItems = states.map(
      (state, index) => `<li>${index + 1}. ${state}</li>`
    ).join("");

    res.send(`
      <html>
        <head>
          <title>Indian States</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f4f6f8;
              padding: 40px;
            }
            .container {
              background: white;
              padding: 20px;
              max-width: 500px;
              margin: auto;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h2 {
              text-align: center;
              color: #333;
            }
            ul {
              padding-left: 20px;
              list-style-type: none;
            }
            li {
              margin: 6px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>States & UTs of India From 2</h2>
            <ul>${listItems}</ul>
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Unable to fetch states data");
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
