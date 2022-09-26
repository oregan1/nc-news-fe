import { Route, Routes } from 'react-router';
import './App.css';
import Articles from './components/Articles/Articles';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Title from './components/Title/Title';

function App() {
  return (
    <div>
      <Title />      
      <Nav />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/articles' element={<Articles/>} />
      </Routes>
    </div>
  );
}

export default App;
