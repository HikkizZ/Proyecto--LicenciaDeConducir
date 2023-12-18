import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ActualizarCita from './components/citas/ActualizarCita.jsx';
import CrearCita from './components/citas/CrearCita.jsx'; // Importa CrearCita
import DetalleCita from './components/citas/DetalleCita.jsx'; // Importa DetalleCita
import ListaCitas from './components/citas/ListaCitas.jsx'; // Importa ListaCitas
import SubirArchivo from './components/upload/SubirArchivo.jsx'; // Importa SubirArchivo
import './index.css';
import App from './routes/App.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Root from './routes/Root.jsx';

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
      {
        path: '/subir-archivo', // Nueva ruta para subir archivo
        element: <SubirArchivo />,
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
