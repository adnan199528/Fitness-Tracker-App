 

//update code background image with gardient 
import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { token } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({ ...workout });
  const [error, setError] = useState(null);

  // Hover states
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isUpdateHovered, setIsUpdateHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  const handleDelete = async () => {
    if (!token) {
      toast.error("You must be logged in to delete a workout.");
      return;
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
      toast.success("Workout deleted successfully!");
    } else {
      toast.error(json.error || "Failed to delete workout.");
    }
  };

  const handleEdit = () => {
    setEditedWorkout({ ...workout });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to update a workout.");
      return;
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editedWorkout)
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      toast.error(json.error || "Failed to update workout.");
    } else {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      setIsEditing(false);
      setError(null);
      toast.success("Workout updated successfully!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout(prev => ({ ...prev, [name]: value }));
  };

  // --- STYLES FOR DISPLAY ROW ---
  const trStyle = { borderBottom: '1px solid rgba(255, 191, 0, 0.2)' };
  const tdStyle = { 
    padding: '15px', 
    color: 'white',
    borderRight: '1px solid rgba(255, 191, 0, 0.2)',
  };
  const iconButtonStyle = { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', transition: 'transform 0.2s' };
  const editIconStyle = { ...iconButtonStyle, color: '#FFBF00', transform: isEditHovered ? 'scale(1.2)' : 'scale(1)' };
  const deleteIconStyle = { ...iconButtonStyle, color: '#E74C3C', transform: isDeleteHovered ? 'scale(1.2)' : 'scale(1)' };

  // --- STYLES FOR EDIT FORM (to match Add New Workout form) ---
  const editFormStyle = {
    padding: '20px',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.7)', // Matching Add New Workout form
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
    margin: '10px 0 5px 0',
    color: 'white',
    fontWeight: 'bold'
  };

  const editInputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0 15px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #FFBF00',
    borderRadius: '4px',
    color: 'white',
    boxSizing: 'border-box'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  };

  const updateBtnStyle = {
    flex: 1,
    padding: '12px',
    background: isUpdateHovered ? 'white' : '#FFBF00',
    color: isUpdateHovered ? '#FFBF00' : 'black',
    border: '1px solid #FFBF00',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s'
  };

  const cancelBtnStyle = {
    flex: 1,
    padding: '12px',
    background: isCancelHovered ? '#f0f0f0' : 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  };

  const optionStyles = `
    select option {
      background: #333;
      color: #FFBF00;
    }
  `;

  if (isEditing) {
    return (
      <tr style={trStyle}>
        <td colSpan="7" style={{ padding: '10px', background: 'transparent' }}>
          <style>{optionStyles}</style>
          <form onSubmit={handleUpdate} style={editFormStyle}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={editHeadingStyle}>Edit Workout</h3>
            </div>

            <label style={editLabelStyle}>Exercise Name:</label>
            <select name="exerciseName" style={editInputStyle} onChange={handleChange} value={editedWorkout.exerciseName}>
              <option value="Push-Ups">Push-Ups</option>
              <option value="Squats">Squats</option>
              <option value="Plank">Plank</option>
              <option value="Lunges">Lunges</option>
              <option value="Burpees">Burpees</option>
              <option value="Bicep Curls">Bicep Curls</option>
            </select>

            <label style={editLabelStyle}>Weight (in kg):</label>
            <input name="weight" style={editInputStyle} type="number" onChange={handleChange} value={editedWorkout.weight} />

            <label style={editLabelStyle}>Sets:</label>
            <input name="sets" style={editInputStyle} type="number" onChange={handleChange} value={editedWorkout.sets} />

            <label style={editLabelStyle}>Reps:</label>
            <input name="reps" style={editInputStyle} type="number" onChange={handleChange} value={editedWorkout.reps} />

            <label style={editLabelStyle}>Category:</label>
            <select name="category" style={editInputStyle} onChange={handleChange} value={editedWorkout.category}>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Core">Core</option>
              <option value="Cardio / Full Body">Cardio / Full Body</option>
            </select>

            <div style={buttonContainerStyle}>
              <button
                type="submit"
                style={updateBtnStyle}
                onMouseEnter={() => setIsUpdateHovered(true)}
                onMouseLeave={() => setIsUpdateHovered(false)}
              >
                Update Workout
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={cancelBtnStyle}
                onMouseEnter={() => setIsCancelHovered(true)}
                onMouseLeave={() => setIsCancelHovered(false)}
              >
                Cancel
              </button>
            </div>
            {error && <div style={{ color: '#ff4d4d', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr style={trStyle}>
      <td style={tdStyle}>{workout.exerciseName}</td>
      <td style={tdStyle}>{workout.weight}</td>
      <td style={tdStyle}>{workout.sets}</td>
      <td style={tdStyle}>{workout.reps}</td>
      <td style={tdStyle}>{workout.category}</td>
      <td style={tdStyle}>{new Date(workout.createdAt).toLocaleString()}</td>
      <td style={{...tdStyle, textAlign: 'center', borderRight: 'none'}}>
        <button style={editIconStyle} onClick={handleEdit} onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}><FaEdit /></button>
        <span style={{margin: '0 10px'}}></span>
        <button style={deleteIconStyle} onClick={handleDelete} onMouseEnter={() => setIsDeleteHovered(true)} onMouseLeave={() => setIsDeleteHovered(false)}><FaTrash /></button>
      </td>
    </tr>
  );
};

export default WorkoutDetails;