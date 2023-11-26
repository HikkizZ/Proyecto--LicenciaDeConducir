import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import CrearCita from './components/citas/CrearCita.jsx'; // Importa CrearCita
import ListaCitas from './components/citas/ListaCitas.jsx'; // Importa ListaCitas
import DetalleCita from './components/citas/DetalleCita.jsx'; // Importa DetalleCita
import ActualizarCita from './components/citas/ActualizarCita.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/crear-cita', // Ruta para Crear Cita
        element: <CrearCita />,
      },
      {
        path: '/citas', // Ruta para Lista de Citas
        element: <ListaCitas />,
      },
      {
        path: '/cita/:id', // Ruta para Detalle de Cita
        element: <DetalleCita />,
      },
      {
        path: '/actualizar-cita/:id', // Ruta para Actualizar Cita
        element: <ActualizarCita />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
