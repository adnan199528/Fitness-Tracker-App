//update code background with gradient 
import { useEffect, useState } from 'react';
import { useProgressContext } from '../hooks/useProgressContext';
import { useAuth } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import ProgressDetails from '../components/ProgressDetails';
import ProgressForm from '../components/ProgressForm';

const Progress = () => {
  const { progress, dispatch } = useProgressContext();
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProgress = async () => {
      const response = await fetch('/api/progress', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_PROGRESS', payload: json });
      }
    };

    if (token) {
      fetchProgress();
    }
  }, [dispatch, token]);

  const filteredProgress =
    progress &&
    progress.filter((p) => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();

      // Weight search logic
      const weightMatch = p.weight && p.weight.toString().toLowerCase().includes(query);

      // Waist search logic
      const waistMatch = p.waist && p.waist.toString().toLowerCase().includes(query);

      return weightMatch || waistMatch;
    });

  const hasProgress = progress && progress.length > 0;

  // --- Styles (Copied from Workout.js/Meals.js) ---
  const pageStyle = {
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(100vh - 70px)',
  };

  const formContainerStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop')`, // New dark progress-related image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 20px',
  };

  const listContainerStyle = {
    background: 'linear-gradient(135deg, #000000, #4d3a00)',
    padding: '30px 20px',
    color: 'white',
  };
  
  const searchContainerStyle = {
    padding: "20px 0",
    textAlign: "center",
  };

  const searchInputStyle = {
    width: "50%",
    padding: "12px 20px",
    fontSize: "1rem",
    borderRadius: "25px",
    border: "2px solid #FFBF00",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const tableHeaderStyle = {
    color: '#FFBF00',
    borderBottom: '2px solid #FFBF00',
    padding: '15px',
    textAlign: 'left',
    borderRight: '1px solid rgba(255, 191, 0, 0.2)',
  };

  const headingContainerStyle = {
    textAlign: 'center',
    paddingTop: '20px',
  };

  const headingStyle = {
    color: 'white',
    fontSize: '2rem',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '3px solid #FFBF00',
    display: 'inline-block',
  };

  return (
    <div style={pageStyle}>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div style={formContainerStyle}>
        <ProgressForm />
      </div>
      {hasProgress && (
        <div style={listContainerStyle}>
          <div style={headingContainerStyle}>
            <h3 style={headingStyle}>Your Progress</h3>
          </div>
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search by Weight or Waist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle}
              onFocus={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
              onBlur={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.1)")}
            />
          </div>
          <div className="table-responsive-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Weight</th>
                  <th style={tableHeaderStyle}>Waist</th>
                  <th style={tableHeaderStyle}>Chest</th>
                  <th style={tableHeaderStyle}>Runtime</th>
                  <th style={tableHeaderStyle}>Max Lift</th>
                  <th style={tableHeaderStyle}>Date</th>
                  <th style={{...tableHeaderStyle, borderRight: 'none'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgress && filteredProgress.map((p) => (
                  <ProgressDetails key={p._id} progress={p} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;