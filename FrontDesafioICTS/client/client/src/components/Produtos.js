import React from "react";
import { Table, Button, Form, Modal } from 'react-bootstrap';


class Produtos extends React.Component {//React.Component faz com que a classe se torne um componente

    constructor(props) {
        super(props);//chama o objeto pai de props, permitindo o uso de suas funcoes

        this.state = {
            //o state é um elemento que armazena propriedades
            //no caso do teste
            produto : [ 
            {'id': '', 'nome': '', 'preco' :'', 'datacriacao':'', 'dataatualizacao':'',  'modalAberta': false 
        }
    ]
        }
    }

    //Funcao para decidir o que fazer quando o componente produtos for montado. Nesse caso é utilizado para pegar a o endereço da api, converter o json e 
    //passar os dados para o array criado em cima, chamando a função buscarAluno
    componentDidMount() {
        
        this.buscarProduto();
        
    }

    componentWillUnmount() {

    }

 

    //busca da api e atualiza os dados
    buscarProduto = (() => {
        fetch("http://localhost:3003/api/produtos")
            .then((response) => response.json())
            .then((actualData) => {
                this.setState({produto: actualData })
                
            });
    });
            /*.then(dados => {
                this.setState({ produtos: dados })//depois da atribuicao o array criado no state recebe os dados recebidos pela busca
                console.log(dados)*/
            
    
    //Deleta a produto selecionada baseada no id passado
    deletarProduto = (id) => {
        fetch("http://localhost:3003/api/produtos/" + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarProduto();
                } else {
                    alert('Não foi possível deletar o produto')
                }
            })
    }

    //Adiciona uma nova produto tendo como parametro a produto
    cadastraProduto = (produto) => {
        fetch("http://localhost:3003/api/produtos",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },//da a formatacao da api, tendo primeiro o 
                //tipo do conteudo, atribuindo a aplicacao retornada pelo json
                body: JSON.stringify(produto)//cria uma string com o JSON
            })

            .then(resposta => {
                if (resposta.ok) {//testa de a produto foi inserida corretamente na pagina
                    this.buscarProduto();
                } else {
                    alert('Não foi possível adicionar a produto')
                    console.log(resposta)
                }
            })

    }

    atualizaProduto = (produto) => {
        fetch("http://localhost:3003/api/produtos/" + produto.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarProduto()
                } else {
                    alert('Produto não encontrada')
                }

            })
    }

    carregaProduto = (id) => {
        fetch("http://localhost:3003/api/produtos/" + id, { method: 'GET' })
            .then(resposta => resposta.json())//o resultado da busca recebe um json
            .then(produto => {
                produto = produto.result;
                console.log(produto.nome)
                this.setState({
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    datacriacao: produto.datacriacao,
                    dataatualizacao: produto.dataatualizacao
                })//depois da atribuicao o array criado no state recebe os dados recebidos pela busca
            })
        this.abrirModal();
    }


    //Criação da tabela
    renderTable() {
        console.log("renderTable")
        return (<Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Data de Criação</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {
                    
                    //Mapear cada item dentro da propriedade produtos com a variavel produto, logo, cada vez que ler o array, informa os dados pedidos
                    this.state.produto.map((produto) =>
                        <tr>
                            <td> {produto.id} </td>
                            <Button variant="light" style={{backgroundColor:'none', width:'100%', height:'55px', borderStyle:'none'}} 
                            onClick={() => this.carregaProduto(produto.id)}><td>{produto.nome}</td></Button>
                            <td> {produto.preco} </td>
                            <td>{new Date(produto.datacriacao).toLocaleDateString('pt-BR')}</td>
                            <td><Button variant="warning" onClick={() => this.carregaProduto(produto.id)}>Atualizar</Button>{' '}
                                <Button variant="danger" onClick={() => this.deletarProduto(produto.id)}>Excluir</Button></td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
        )

    }

    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )

    }

    atualizaPreco = (e) => {
        this.setState(
            {
                preco: e.target.value
            }
        )

    }

    atualizaId = (e) => {
        this.setState(
            {
                id: e.target.value
            }
        )

    }

    submit = () => {
        if (!this.state.id) {
            const produto = {
                nome: this.state.nome,
                preco: this.state.preco
            }
            this.cadastraProduto(produto);
        } else {
            const produto = {
                id: this.state.id,
                nome: this.state.nome,
                preco: this.state.preco

            }
            this.atualizaProduto(produto);


        }
        this.fecharModal();
    }

    reset = () => {
        this.setState({
            id: '',
            nome: '',
            preco: '',


        })
        this.abrirModal();
    }

    fecharModal = () => {
        this.setState(
            {
                modalAberta: false
            }
        )

    }

    abrirModal = () => {
        this.setState(
            {
                modalAberta: true
            }
        )

    }


    render() {
        return (
            <div>
                    <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>DADOS DA COMPRA</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>


                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do produto" value={this.state.nome} onChange={this.atualizaNome} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="text" placeholder="Digite o preço do produto"  value={this.state.preco} onChange={this.atualizaPreco} />
                            </Form.Group>
                            

                        </Form>


                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" type="submit" onClick={this.submit}>
                            Salvar
                        </Button>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Close
                        </Button>


                    </Modal.Footer>
                </Modal>

                <Button variant="secondary" onClick={this.reset}>
                    Novo
                </Button>

                { this.renderTable() }
                
            </div>


        )
    }

}


export default Produtos;