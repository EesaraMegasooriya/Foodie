import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'; 

// Events
import EventHome from './components/Events/EventHome';
import BrowseEvents from './components/Events/BrowseEvents';
import CreateEvent from './components/Events/CreateEvent';
import EventSingleView from './components/Events/EventSingleView';

// Skills
import SkillsHome from './components/Skills/SkillsHome';
import HomeSkillShare from '../src/components/Skills/HomeSkillShare';
import AddLesson from '../src/components/Skills/AddLesson';
import UpdateLesson from '../src/components/Skills/UpdateLesson';
import AdminLessonView from '../src/components/Skills/AdminLessonView';
import LessonListUser from '../src/components/Skills/LessonListUser';
import LessonDetails from '../src/components/Skills/LessonDetails';


// Posts
import PostsHome from './components/Posts/PostHome';

// Recipes
import RecipesHome from './components/Recipies/RecipieHome';

// Layout wrapper with Header, Footer, and Outlet
const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Home Page */}
          <Route index element={<Home />} />

          {/* Events */}
          <Route path="events" element={<EventHome />} />
          <Route path="events/browse" element={<BrowseEvents />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/:id" element={<EventSingleView />} />

          {/* Skills */}
          <Route path="skills" element={<SkillsHome />} />
          <Route path="skillshare">
            <Route index element={<HomeSkillShare />} />
            <Route path="add" element={<AddLesson />} />
            <Route path="update" element={<UpdateLesson />} />
            <Route path="adminlist" element={<AdminLessonView />} />
            <Route path="userlist" element={<LessonListUser />} />
            <Route path="lesson/:id" element={<LessonDetails />} />
          </Route>
       

          {/* Posts */}
          <Route path="posts" element={<PostsHome />} />

          {/* Recipes */}
          <Route path="recipes" element={<RecipesHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
