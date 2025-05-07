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
// Skills (Skill Share)
import SkillsHome from './components/Skills/SkillsHome';
import HomeSkillShare from './components/Skills/HomeSkillShare';
import AddLesson from './components/Skills/AddLesson';
import LessonListUser from './components/Skills/LessonListUser';
import LessonDetail from './components/Skills/LessonDetail';
import CourseUpdate from './components/Skills/CourseUpdate';
import CourseDelete from './components/Skills/CourseDelete';


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
            <Route path="skills/home" element={<HomeSkillShare />} />
            <Route path="skillshare" element={<HomeSkillShare />} /> {/* 👈 FIXED: added this */}
            <Route path="skills/add" element={<AddLesson />} />
            <Route path="skills/userlist" element={<LessonListUser />} />
            <Route path="skills/lesson/:id" element={<LessonDetail />} />
            <Route path="/lesson/update/:id" element={<CourseUpdate />} />
            <Route path="/lesson/delete/:id" element={<CourseDelete />} /> 
           
            

            

       

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
