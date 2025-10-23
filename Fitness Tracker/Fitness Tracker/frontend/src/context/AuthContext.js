
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//         try {
//           // API endpoint ko theek kiya gaya hai
//           const res = await axios.get('http://localhost:5000/api/users/me');
//           setUser(res.data);
//           setToken(storedToken);
//           setIsAuthenticated(true);
//         } catch (err) {
//           localStorage.removeItem('token');
//           setToken(null);
//           setIsAuthenticated(false);
//         }
//       }
//       setLoading(false);
//     };
//     loadUser();
//   }, []);

//   const login = async (email, password) => {
//     // API endpoint ko theek kiya gaya hai
//     const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    
//     // User data fetch karna hai (endpoint theek kiya gaya hai)
//     const userRes = await axios.get('http://localhost:5000/api/users/me');
//     setUser(userRes.data);
//     setToken(res.data.token);
//     setIsAuthenticated(true);
//     toast.success('Logged in successfully!');
//   };

//   // `signup` function ko update kiya gaya hai
//   const signup = async (name, username, email, password) => {
//     // API endpoint ko theek kiya gaya hai aur data object banaya gaya hai
//     const res = await axios.post('http://localhost:5000/api/users/register', {
//       name,
//       username,
//       email,
//       password,
//     });
//     localStorage.setItem('token', res.data.token);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
//     setUser(res.data.user);
//     setToken(res.data.token);
//     setIsAuthenticated(true);
//     toast.success('User registered successfully!');
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     setIsAuthenticated(false);
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   const value = {
//     token,
//     user,
//     isAuthenticated,
//     loading,
//     login,
//     signup,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


//clodinary
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = null;
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // Try to parse user first
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        // Corrupted user data, clear everything
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }

    // Now check if we have a valid token and user
    if (storedToken && storedToken !== 'null' && user) {
      setToken(storedToken);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setIsAuthenticated(true);
    } else {
      // If anything is invalid or missing, ensure we are in a clean logged-out state
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    
    const userRes = await axios.get('http://localhost:5000/api/users/me');
    localStorage.setItem('user', JSON.stringify(userRes.data));
    setUser(userRes.data);
    setToken(res.data.token);
    setIsAuthenticated(true);
    toast.success('Logged in successfully!');
  };

  const signup = async (name, username, email, password) => {
    const res = await axios.post('http://localhost:5000/api/users/register', {
      name,
      username,
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
    setToken(res.data.token);
    setIsAuthenticated(true);
    toast.success('User registered successfully!');
  };

  const logout = () => {
    // Clear auth state
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    token,
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};