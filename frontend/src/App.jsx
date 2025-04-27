import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PostForm from './components/Posts/PostForm';
import PostHome from './components/Posts/PostHome';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostHome />} />
        <Route path="/posts/create" element={<PostForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
