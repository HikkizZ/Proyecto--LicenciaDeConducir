import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Ya estás logeado!</h4>
          <p>Ya tienes una sesión activa en el sistema.</p>
          <hr />
          <button className="btn btn-primary" onClick={() => navigate('/')}>Ir a Inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Inicia sesión!</h2>
      <LoginForm />
    </div>
  );
}

export default Login;

