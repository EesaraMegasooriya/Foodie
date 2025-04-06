import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'; 

//Events
import EventHome from './components/Events/EventHome';

//Skills
import SkillsHome from './components/Skills/SkillsHome';

//Posts
import PostsHome from './components/Posts/PostHome';

//Recipes
import RecipesHome from './components/Recipies/RecipieHome';






function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/events" element={<EventHome />} />

        <Route path="/skills" element={<SkillsHome />} />

        <Route path="/posts" element={<PostsHome />} />

        <Route path="/recipes" element={<RecipesHome />} />
        

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
