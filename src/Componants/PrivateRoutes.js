// PrivateRoutes.js
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const auth = localStorage.getItem('authToken');

  return auth? <Outlet /> : <Navigate to='/Login1' />;
};

export default PrivateRoutes;
