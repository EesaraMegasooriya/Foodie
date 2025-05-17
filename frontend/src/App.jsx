// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PostsHome from './components/Posts/PostsHome';
import UploadPost from './components/Posts/UploadPost';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsHome />} />
          <Route path="/posts/create" element={<UploadPost />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
