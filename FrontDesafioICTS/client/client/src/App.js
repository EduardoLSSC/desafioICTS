import './App.css';
import './components/Compras';
import './components/Home';
import './components/Produtos';
import Compras from './components/Compras';
import Home from './components/Home';
import Produtos from './components/Produtos';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return( 
  <div className='App'>
    <h1 className='title'>Listas</h1>
    <BrowserRouter>
    <Nav fill variant='tabs'>
      <Nav.Link as={Link} to='/compras'>Lista de Compras</Nav.Link>
      <Nav.Link as={Link} to='/produtos'>Lista de Produtos</Nav.Link>
    </Nav>
    <Routes>
      <Route path='/' element={<Produtos/>}></Route>
      <Route path='/compras' element={<Compras/>}></Route>
      <Route path='/produtos' element={<Produtos />}></Route>
    </Routes>
    </BrowserRouter>
  </div> 
);}

export default App;
