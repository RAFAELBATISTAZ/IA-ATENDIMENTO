import { useState } from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Home from './pages/Home';
    import Login from './pages/Login';
    import Register from './pages/Register';
    import Dashboard from './pages/Dashboard';

    function App() {
      const [user, setUser] = useState(null);

      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;
