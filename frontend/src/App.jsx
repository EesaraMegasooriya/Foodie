
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'; 

import Login from './components/User/Login';
import Register from './components/User/Register';
import OAuthSuccess from './components/User/OAuthSuccess';


//Events
import EventHome from './components/Events/EventHome';
import BrowseEvents from './components/Events/BrowseEvents';
import CreateEvent from './components/Events/CreateEvent';
import EventSingleView from './components/Events/EventSingleView';
import EventUpdate from './components/Events/EventUpdate';


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
        <Route path="/events/browse" element={<BrowseEvents />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventSingleView />} />
        <Route path="/events/update/:id" element={<EventUpdate />} />

        {/* Add more routes as needed */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route path="/skills" element={<SkillsHome />} />

        <Route path="/posts" element={<PostsHome />} />

        <Route path="/recipes" element={<RecipesHome />} />
        

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
