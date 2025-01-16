import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';
import RecipeListCards from './components/recipe/RecipeListCards';
import { RecipeProvider } from './context/RecipeContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import MyProfile from './pages/profile/MyProfile';
import CreateRecipe from './pages/recipe/CreateRecipe';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RecipeProvider ><Home /></RecipeProvider>} >
            <Route path="/" element={<RecipeListCards recipesProps={[]} />} />
            <Route path="create" element={<CreateRecipe />} />
            <Route path="my-profile" element={<MyProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
