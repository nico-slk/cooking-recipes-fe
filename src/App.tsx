// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import ProtectedRoute from './common/ProtectedRoute';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Home from './pages/home/Home';
import RecipeListCards from './components/recipe/RecipeListCards';
import { RecipeProvider } from './context/RecipeContext';

function App() {

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />

  //       <Route element={<ProtectedRoute />}>
  //         <Route path="/" element={<RecipeProvider ><Home /></RecipeProvider>} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <RecipeProvider ><RecipeListCards /></RecipeProvider>

  );

}

export default App;
