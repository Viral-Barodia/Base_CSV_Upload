import { Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent/LoginComponent';
import ParentComponent from './components/ParentComponent/ParentComponent';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/dashboard" element={<PrivateRoute><ParentComponent /></PrivateRoute>} />
    </Routes>
  )
}

export default App