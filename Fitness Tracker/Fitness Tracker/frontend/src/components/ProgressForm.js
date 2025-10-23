
//update code background with gardient 
import { useState } from 'react';
import { useProgressContext } from '../hooks/useProgressContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressForm = () => {
  const { dispatch } = useProgressContext();
  const { token } = useAuth();

  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  const [runtime, setRuntime] = useState('');
  const [liftMax, setLiftMax] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    if (!weight || !waist || !chest || !runtime || !liftMax) {
      toast.error("please fill in all feilds");
      return;
    }

    const progress = { weight, waist, chest, runtime, liftMax };

    const response = await fetch('/api/progress', {
      method: 'POST',
      body: JSON.stringify(progress),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      setWeight('');
      setWaist('');
      setChest('');
      setRuntime('');
      setLiftMax('');
      dispatch({ type: 'CREATE_PROGRESS', payload: json });
      toast.success('add new progress successfully');
    }
  };

  // --- Styles (Copied from WorkoutForm.js) ---
  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
  };

  const headingStyle = {
    color: 'white',
    textAlign: 'center',
    paddingBottom: '10px',
    borderBottom: '3px solid #FFBF00',
    display: 'inline-block',
  };

  const labelStyle = {
    display: 'block',
    margin: '15px 0 5px 0',
    color: 'white',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0 10px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #FFBF00',
    borderRadius: '4px',
    color: 'white',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: isHovered ? 'white' : '#FFBF00',
    color: isHovered ? '#FFBF00' : 'black',
    border: '1px solid #FFBF00',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'background-color 0.3s, color 0.3s'
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={headingStyle}>Add New Progress</h3>
      </div>

      <label style={labelStyle}>Weight :</label>
      <input style={inputStyle} type="number" min="0" onChange={(e) => setWeight(e.target.value)} value={weight} placeholder="" />

      <label style={labelStyle}>Waist:</label>
      <input style={inputStyle} type="number" min="0" onChange={(e) => setWaist(e.target.value)} value={waist} placeholder="" />

      <label style={labelStyle}>Chest:</label>
      <input style={inputStyle} type="number" min="0" onChange={(e) => setChest(e.target.value)} value={chest} placeholder="" />

      <label style={labelStyle}>Runtime:</label>
      <input style={inputStyle} type="number" min="0" onChange={(e) => setRuntime(e.target.value)} value={runtime} placeholder="" />

      <label style={labelStyle}>Max Lift:</label>
      <input style={inputStyle} type="number" min="0" onChange={(e) => setLiftMax(e.target.value)} value={liftMax} placeholder="" />

      <button style={buttonStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Add Progress</button>
    </form>
  );
};

export default ProgressForm;