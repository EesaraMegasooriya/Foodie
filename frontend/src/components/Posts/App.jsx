import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PostForm from './components/Posts/PostForm';
import PostsHome from './components/Posts/PostsHome';  // Corrected import name

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsHome />} /> {/* Updated path and component */}
        <Route path="/posts/create" element={<PostForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
