
import { useSelector } from "react-redux";
import Login from "../pages/Login/Login";


const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Login/>
  }
  return children;
};

export default ProtectedRoute;