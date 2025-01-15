import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';
import { RecipeProvider } from './context/RecipeContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <RecipeProvider ><Home ><p>children</p></Home></RecipeProvider>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
