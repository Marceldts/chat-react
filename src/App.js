import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App;
