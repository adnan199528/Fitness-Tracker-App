
//update code background with gradient 
import { useProgressContext } from '../hooks/useProgressContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProgressDetails = ({ progress }) => {
  const { dispatch } = useProgressContext();
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProgress, setEditedProgress] = useState({ ...progress });
  const [error, setError] = useState(null);

  // Hover states
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isUpdateHovered, setIsUpdateHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  const handleDelete = async () => {
    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    const response = await fetch('/api/progress/' + progress._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PROGRESS', payload: json });
      toast.success("delete progress successfully");
    } else {
      toast.error(json.error || "Failed to delete progress.");
    }
  };

  const handleEdit = () => {
    setEditedProgress({ ...progress });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    const response = await fetch('/api/progress/' + progress._id, {
      method: 'PATCH',
      body: JSON.stringify(editedProgress),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      toast.error(json.error || "Failed to update progress.");
    } else {
      dispatch({ type: 'UPDATE_PROGRESS', payload: json });
      setIsEditing(false);
      setError(null);
      toast.success("update progress successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProgress(prev => ({ ...prev, [name]: value }));
  };

  // --- STYLES (Copied from WorkoutDetails.js) ---
  const trStyle = { borderBottom: '1px solid rgba(255, 191, 0, 0.2)' };
  const tdStyle = {
    padding: '15px',
    color: 'white',
    borderRight: '1px solid rgba(255, 191, 0, 0.2)',
  };
  const iconButtonStyle = { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', transition: 'transform 0.2s' };
  const editIconStyle = { ...iconButtonStyle, color: '#FFBF00', transform: isEditHovered ? 'scale(1.2)' : 'scale(1)' };
  const deleteIconStyle = { ...iconButtonStyle, color: '#E74C3C', transform: isDeleteHovered ? 'scale(1.2)' : 'scale(1)' };

  const editFormStyle = {
    padding: '30px',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.7)',
    maxWidth: '500px',
    margin: '20px auto',
  };

  const editHeadingStyle = {
    color: 'white',
    textAlign: 'center',
    paddingBottom: '10px',
    borderBottom: '3px solid #FFBF00',
    display: 'inline-block',
    marginBottom: '20px'
  };

  const editLabelStyle = {
    display: 'block',
    margin: '15px 0 5px 0',
    color: 'white',
    fontWeight: 'bold'
  };

  const editInputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0 10px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #FFBF00',
    borderRadius: '4px',
    color: 'white',
    boxSizing: 'border-box'
  };

  const buttonContainerStyle = { display: 'flex', gap: '10px', marginTop: '20px' };
  const updateBtnStyle = { flex: 1, padding: '12px', background: isUpdateHovered ? 'white' : '#FFBF00', color: isUpdateHovered ? '#FFBF00' : 'black', border: '1px solid #FFBF00', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background-color 0.3s, color 0.3s' };
  const cancelBtnStyle = { flex: 1, padding: '12px', background: isCancelHovered ? '#f0f0f0' : 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background-color 0.3s' };

  if (isEditing) {
    return (
      <tr style={trStyle}>
        <td colSpan="7" style={{ padding: '10px', background: 'transparent' }}>
          <form onSubmit={handleUpdate} style={editFormStyle}>
            <div style={{ textAlign: 'center' }}><h3 style={editHeadingStyle}>Edit Progress</h3></div>
            
            <label style={editLabelStyle}>Weight:</label>
            <input name="weight" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedProgress.weight} />
            
            <label style={editLabelStyle}>Waist:</label>
            <input name="waist" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedProgress.waist} />
            
            <label style={editLabelStyle}>Chest:</label>
            <input name="chest" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedProgress.chest} />
            
            <label style={editLabelStyle}>Runtime:</label>
            <input name="runtime" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedProgress.runtime} />
            
            <label style={editLabelStyle}>Max Lift:</label>
            <input name="liftMax" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedProgress.liftMax} />

            <div style={buttonContainerStyle}>
              <button type="submit" style={updateBtnStyle} onMouseEnter={() => setIsUpdateHovered(true)} onMouseLeave={() => setIsUpdateHovered(false)}>Update Progress</button>
              <button type="button" onClick={handleCancel} style={cancelBtnStyle} onMouseEnter={() => setIsCancelHovered(true)} onMouseLeave={() => setIsCancelHovered(false)}>Cancel</button>
            </div>
            {error && <div style={{ color: '#ff4d4d', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr style={trStyle}>
      <td style={tdStyle}>{progress.weight}</td>
      <td style={tdStyle}>{progress.waist}</td>
      <td style={tdStyle}>{progress.chest}</td>
      <td style={tdStyle}>{progress.runtime}</td>
      <td style={tdStyle}>{progress.liftMax}</td>
      <td style={tdStyle}>{new Date(progress.date).toLocaleString()}</td>
      <td style={{ ...tdStyle, textAlign: 'center', borderRight: 'none' }}>
        <button style={editIconStyle} onClick={handleEdit} onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}><FaEdit /></button>
        <span style={{ margin: '0 10px' }}></span>
        <button style={deleteIconStyle} onClick={handleDelete} onMouseEnter={() => setIsDeleteHovered(true)} onMouseLeave={() => setIsDeleteHovered(false)}><FaTrash /></button>
      </td>
    </tr>
  );
};

export default ProgressDetails;