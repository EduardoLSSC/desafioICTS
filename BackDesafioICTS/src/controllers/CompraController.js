const CompraService = require('../services/CompraService')

module.exports = {
    buscarTodos: async (req, res)=> {
        let json = {error:'', result: []};
        let compras = await CompraService.buscarTodos();
            res.json(compras);

    },

    buscarUm: async (req, res) => {
        let json = {result:{}}

        let id = req.params.id;
        let compra = await CompraService.buscarUm(id);

        if(compra){
            json.result = compra;
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
            let novoCompra = await CompraService.inserir(nome, preco, datacriacao, dataatualizacao)
            json.result = {
                id: novoCompra,
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
        let compra = await CompraService.deletar(id);

        if(compra){
            json.result = compra;
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
            await CompraService.alterar(id, nome, preco)
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