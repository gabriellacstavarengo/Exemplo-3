const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

let ferramentas = [
  { id: 1, nome: "Martelo", preco: 25, disponivel: true },
  { id: 2, nome: "Chave de Fenda", preco: 15, disponivel: true },
  { id: 3, nome: "Alicate", preco: 32, disponivel: false },
  { id: 4, nome: "Serrote", preco: 54, disponivel: true },
];

app.get("/ferramentas", (req, res) => {
  res.json(ferramentas);
});

app.get("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  const ferramenta = ferramentas.find((f) => f.id === id);
  res.json(ferramenta);
});

app.put("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  const ferramenta = ferramentas.find((f) => f.id === id);
  if (!ferramentas) {
    return res.status(404).json({ erro: "Ferramenta não encontrada" });
  }
  ferramenta.nome = req.body.nome;
  res.json(ferramenta);
});

app.post("/ferramentas", (req, res) => {
  const novo = {
    id: ferramentas.length + 1,
    nome: req.body.nome,
  };
  ferramentas.push(novo);
  res.status(201).json(novo);
});

app.delete("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  ferramentas = ferramentas.filter((f) => f.id !== id);
  res.json({ mensagem: "Ferramenta removido com sucesso" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
}); 