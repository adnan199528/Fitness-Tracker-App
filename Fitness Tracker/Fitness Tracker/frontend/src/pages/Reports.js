//update code background with gradient
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPdfHovered, setIsPdfHovered] = useState(false);
  const [isCsvHovered, setIsCsvHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleGenerateReport = async (format) => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date cannot be after end date.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/reports/generate-${format}-report`, {
        params: {
          startDate,
          endDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      saveAs(blob, `report.${format}`);
      toast.success(`Generated ${format.toUpperCase()} report successfully!`);
    } catch (err) {
      toast.error('Error generating report. Please try again.');
      console.error(err);
    }
  };

  // --- Styles ---
  const pageStyle = {
    width: '100vw',
    minHeight: 'calc(100vh - 70px)',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundImage: `url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const formContainerStyle = {
    background: 'rgba(20, 20, 20, 0.85)',
    borderRadius: '20px',
    padding: '50px 60px', // Decreased vertical padding
    width: '100%',
    maxWidth: '550px', // Decreased width
    boxShadow: '0 15px 25px rgba(0,0,0,0.5)',
    border: '1px solid #FFBF00',
  };

  const headingStyle = {
    color: '#FFBF00',
    textAlign: 'center',
    marginBottom: '50px',
    fontSize: '2.8rem', // Slightly smaller heading
    fontWeight: '900',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  };

  const datePickersContainerStyle = {
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-between',
    gap: '40px',
    marginBottom: '50px',
  };

  const datePickerWrapperStyle = {
    flex: 1,
  };

  const labelStyle = {
    display: 'block',
    color: 'white',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid #FFBF00',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1.1rem',
    colorScheme: 'dark',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'center',
    gap: '30px',
  };

  const buttonStyle = (isHovered) => ({
    flex: 1,
    maxWidth: isSmallScreen ? '100%' : '220px', // Adjusted button width
    padding: '18px',
    background: 'transparent',
    color: '#FFBF00',
    border: '2px solid #FFBF00',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    letterSpacing: '1px',
    ...(isHovered && {
      background: '#FFBF00',
      color: 'black',
      boxShadow: '0 0 20px #FFBF00',
    }),
  });

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
        theme="dark"
      />
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Generate  fitness Report</h2>
        <div style={datePickersContainerStyle}>
          <div style={datePickerWrapperStyle}>
            <label style={labelStyle}>Starting Date</label>
            <input 
              style={inputStyle} 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div style={datePickerWrapperStyle}>
            <label style={labelStyle}>Ending Date</label>
            <input 
              style={inputStyle} 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        </div>
        <div style={buttonContainerStyle}>
          <button 
            style={buttonStyle(isPdfHovered)} 
            onClick={() => handleGenerateReport('pdf')}
            onMouseEnter={() => setIsPdfHovered(true)}
            onMouseLeave={() => setIsPdfHovered(false)}
          >
            Generate PDF
          </button>
          <button 
            style={buttonStyle(isCsvHovered)} 
            onClick={() => handleGenerateReport('csv')}
            onMouseEnter={() => setIsCsvHovered(true)}
            onMouseLeave={() => setIsCsvHovered(false)}
          >
            Generate CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;