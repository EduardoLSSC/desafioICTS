import React from "react";
import { Table, Button, Form, Modal } from 'react-bootstrap';


class Compras extends React.Component {//React.Component faz com que a classe se torne um componente

    constructor(props) {
        super(props);//chama o objeto pai de props, permitindo o uso de suas funcoes

        this.state = {
            //o state é um elemento que armazena propriedades
            //no caso do teste
            compra : [ 
            {'id': '', 'nome': '', 'preco' :'', 'datacriacao':'', 'dataatualizacao':'',  'modalAberta': false 
        }
    ]
        }
    }

    //Funcao para decidir o que fazer quando o componente compras for montado. Nesse caso é utilizado para pegar a o endereço da api, converter o json e 
    //passar os dados para o array criado em cima, chamando a função buscarAluno
    componentDidMount() {
        
        this.buscarCompra();
        
    }

    componentWillUnmount() {

    }

 

    //busca da api e atualiza os dados
    buscarCompra = (() => {
        fetch("http://localhost:3003/api/compras")
            .then((response) => response.json())
            .then((actualData) => {
                this.setState({compra: actualData })
                
            });
    });
            /*.then(dados => {
                this.setState({ compras: dados })//depois da atribuicao o array criado no state recebe os dados recebidos pela busca
                console.log(dados)*/
            
    
    //Deleta a compra selecionada baseada no id passado
    deletarCompra = (id) => {
        fetch("http://localhost:3003/api/compras/" + id, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarCompra();
                } else {
                    alert('Não foi possível deletar o compra')
                }
            })
    }

    //Adiciona uma nova compra tendo como parametro a compra
    cadastraCompra = (compra) => {
        fetch("http://localhost:3003/api/compras",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },//da a formatacao da api, tendo primeiro o 
                //tipo do conteudo, atribuindo a aplicacao retornada pelo json
                body: JSON.stringify(compra)//cria uma string com o JSON
            })

            .then(resposta => {
                if (resposta.ok) {//testa de a compra foi inserida corretamente na pagina
                    this.buscarCompra();
                } else {
                    alert('Não foi possível adicionar a compra')
                    console.log(resposta)
                }
            })

    }

    atualizaCompra = (compra) => {
        fetch("http://localhost:3003/api/compras/" + compra.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra)
        })
            .then(resposta => {
                if (resposta.ok) {
                    this.buscarCompra()
                } else {
                    alert('Compra não encontrada')
                }

            })
    }

    carregaCompra = (id) => {
        fetch("http://localhost:3003/api/compras/" + id, { method: 'GET' })
            .then(resposta => resposta.json())//o resultado da busca recebe um json
            .then(compra => {
                compra = compra.result;
                console.log(compra.nome)
                this.setState({
                    id: compra.id,
                    nome: compra.nome,
                    preco: compra.preco,
                    datacriacao: compra.datacriacao,
                    dataatualizacao: compra.dataatualizacao
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
                    
                    //Mapear cada item dentro da propriedade compras com a variavel compra, logo, cada vez que ler o array, informa os dados pedidos
                    this.state.compra.map((compra) =>
                        <tr>
                            <td> {compra.id} </td>
                            <button style={{backgroundColor:'none', width:'100%', height:'55px', borderStyle:'none'}}><td>{compra.nome}</td></button>
                            <td> {compra.preco} </td>
                            <td>{new Date(compra.datacriacao).toLocaleDateString('pt-BR')}</td>
                            <td><Button variant="warning" onClick={() => this.carregaCompra(compra.id)}>Atualizar</Button>{' '}
                                <Button variant="danger" onClick={() => this.deletarCompra(compra.id)}>Excluir</Button></td>
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
            const compra = {
                nome: this.state.nome,
                preco: this.state.preco
            }
            this.cadastraCompra(compra);
        } else {
            const compra = {
                id: this.state.id,
                nome: this.state.nome,
                preco: this.state.preco

            }
            this.atualizaCompra(compra);


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
                                <Form.Control type="text" placeholder="Digite o nome do compra" value={this.state.nome} onChange={this.atualizaNome} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="text" placeholder="Digite o preço do compra"  value={this.state.preco} onChange={this.atualizaPreco} />
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


export default Compras;
