const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

const ProdutoController = require('./controllers/ProdutoController')
const CompraController = require('./controllers/CompraController')

router.get('/produtos', ProdutoController.buscarTodos);
router.get('/produtos/:id', ProdutoController.buscarUm);
router.post('/produtos', ProdutoController.inserir);
router.delete('/produtos/:id', ProdutoController.deletar)
router.put('/produtos/:id', ProdutoController.alterar)

router.get('/compras', CompraController.buscarTodos);
router.get('/compras/:id', CompraController.buscarUm);
router.post('/compras', CompraController.inserir);
router.delete('/compras/:id', CompraController.deletar)
router.put('/compras/:id', CompraController.alterar)

module.exports = router;