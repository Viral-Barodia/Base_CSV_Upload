import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: "You need to be logged in!",
        showConfirmButton: false,
        timer: 3000
    });

    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;