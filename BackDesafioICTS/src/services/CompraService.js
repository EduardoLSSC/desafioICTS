const db = require('../db');

module.exports = {
    

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_compras', (error, results) => {
                console.log('entrei')
                if (error) { rejeitado(error); return; }
                //console.log(aceito)
                aceito(results);

            });


        })
    },

    buscarUm: (id) => {
        return new Promise((aceito,rejeitado) => {
            db.query('SELECT * FROM tb_compras WHERE id = ?', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
                else if(results.length > 0){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },


    inserir: (nome, preco) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO tb_compras (nome, preco, datacriacao, dataatualizacao) VALUES (?,?,CURRENT_DATE(),CURRENT_DATE())', 
            [nome, preco], (error, results) => {
                if (error) { rejeitado(error); return;}
                aceito(results.insertCodigo);
            })
        })
    },

    deletar: (id) => {
        return new Promise((aceito,rejeitado) => {
            db.query('DELETE FROM tb_compras WHERE id = ?', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
                else if(results.length > 0){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },

    alterar: (id, nome, preco) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE tb_compras SET nome = ?, preco = ?, dataatualizacao = CURRENT_DATE() WHERE id = ?', 
            [nome, preco, id], (error, results) => {
                if (error) { rejeitado(error); return;}
                aceito(results);
            })
        })
    }
}