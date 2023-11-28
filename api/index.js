const express = require ('express')
const app = express ()

app.use(express.json());

let produtos = [
    {
      "id": 1,
      "marca": "IPhone",
      "descrição": "Última geração de IPhone 15 Sistema Operacional iOS 17.",
      "preço": 5.995
    },
    {
      "id": 2,
      "marca": "Samsung",
      "descrição": "TV Samsung 50 polegadas UHD 4K Samsung 50CU7700.",
      "preço": 2184.50,
    }
];

app.get("/", function(req, res) {
    res.send("<h1>Olá bem vindo a minha API de produtos!!</h1>");
});

//Retornar todos os produtos
app.get("/produtos", function(req, res) {
    return res.json(produtos);
});

//Retornar um produto por ID
app.get("/produtos/:id", function(req, res) {
    const {id} = req.params;

    const produto = produtos.find(p => p.id === parseInt(id));

    if (!produto) {
        return res.status(404).json({mensagem: 'Produto não encontrado!'});
    }

    return res.json(produto);
});

// Adicionar um novo produto
app.post('/produtos', function (req, res) {
    const novoProduto = req.body;
    produtos.push(novoProduto);

    return res.status(201).json(novoProduto);
});


// Atualizar um produto por ID
app.put('/produtos/:id', function (req, res) {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const produtoAtualizado = { ...produtos[index], ...req.body };
    produtos[index] = produtoAtualizado;

    return res.json(produtoAtualizado);
});

// Deletar um produto por ID
app.delete('/produtos/:id', function (req, res) {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const produtoRemovido = produtos.splice(index, 1)[0];

    return res.json({ mensagem: 'Produto removido com sucesso', produto: produtoRemovido });
});













app.listen(8081, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro no servidor!!");
    } else {
        console.log("Servidor funcionando na porta 8081");
    }
});