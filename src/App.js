import { Route, Routes } from 'react-router';
import './App.css';
import Articles from './components/Articles/Articles';
import SingleArticle from './components/Articles/SingleArticle';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Title from './components/Title/Title';

function App() {
  const user = 'jessjelly'

  return (
    <div>
      <Title />      
      <Nav />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/articles' element={<Articles/>} />
        <Route path='/filteredarticles/:topic' element={<Articles/>} />
        <Route path='/articles/:article_id' element={<SingleArticle user={user}/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
