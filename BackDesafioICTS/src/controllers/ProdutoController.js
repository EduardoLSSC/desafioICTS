const ProdutoService = require('../services/ProdutoService')

module.exports = {
    buscarTodos: async (req, res)=> {
        let json = {error:'', result: []};
        let produtos = await ProdutoService.buscarTodos();
            res.json(produtos);

    },

    buscarUm: async (req, res) => {
        let json = {result:{}}

        let id = req.params.id;
        let produto = await ProdutoService.buscarUm(id);

        if(produto){
            json.result = produto;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = {error:'', result:{}}
        let nome = req.body.nome;
        let preco = req.body.preco;
        let datacriacao = req.body.datacriacao;
        let dataatualizacao = req.body.dataatualizacao;
        

        if(nome && preco){
            let novoProduto = await ProdutoService.inserir(nome, preco, datacriacao, dataatualizacao)
            json.result = {
                id: novoProduto,
                nome,
                preco,
                datacriacao,
                dataatualizacao
            }
        }else{
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },

    deletar: async (req, res) => {
        let json = {result:{}}

        let id = req.params.id;
        let produto = await ProdutoService.deletar(id);

        if(produto){
            json.result = produto;
        }

        res.json(json);
    },

    alterar: async (req, res) => {
        let json = {error:'', result:{}}
        //troca por params porque pega do codigo e nao do corpo
        let id = req.body.id;
        let nome = req.body.nome;
        let preco = req.body.preco;

       
        

        if(nome && preco){
            await ProdutoService.alterar(id, nome, preco)
            json.result = {
                id,
                nome,
                preco
            }
        }else{
            json.error = 'Campos não enviados'
        }

        res.json(json);
    }




}