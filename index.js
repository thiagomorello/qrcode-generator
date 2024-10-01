const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Página inicial com um formulário para gerar o QR code
app.get('/', (req, res) => {
  res.send(`
    <h1>Gerador de QR Code</h1>
    <form action="/generate" method="POST">
      <label for="data">Texto para gerar QR Code:</label>
      <input type="text" id="data" name="data" required>
      <button type="submit">Gerar QR Code</button>
    </form>
  `);
});

// Rota para gerar o QR code
app.post('/generate', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.send('Por favor, insira algum texto para gerar o QR Code.');
  }

  // Gera o QR code e envia como resposta
  QRCode.toDataURL(data, {width: 800 }, (err, url) => {
    if (err) {
      return res.send('Erro ao gerar o QR Code.');
    }

    res.send(`
      <h1>QR Code Gerado:</h1>
      <img src="${url}" alt="QR Code">
      <br>
      <a href="/">Voltar</a>
    `);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
