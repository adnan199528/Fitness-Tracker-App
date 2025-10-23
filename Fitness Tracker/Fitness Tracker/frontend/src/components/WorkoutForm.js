
//update
import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user, token } = useAuth();

  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [category, setCategory] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const workout = { exerciseName, weight, sets, reps, category };

    const response = await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      setExerciseName("");
      setWeight("");
      setSets("");
      setReps("");
      setCategory("");
      toast.success("Workout added successfully!");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  // --- Styles ---
  const formStyle = {
    padding: '20px',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.7)', // Darker background for better readability
    maxWidth: '500px', // Set a max-width for better layout on large screens
    margin: '0 auto', // Center the form
  };

  const headingStyle = {
    color: 'white',
    textAlign: 'center',
    paddingBottom: '10px',
    borderBottom: '3px solid #FFBF00',
    display: 'inline-block',
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0 5px 0',
    color: 'white',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0 15px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #FFBF00',
    borderRadius: '4px',
    color: 'white',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#FFBF00',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s'
  };

  const buttonHoverStyle = {
    background: 'white',
    color: '#FFBF00'
  };

  // Style for dropdown options
  const optionStyles = `
    select option {
      background: #333;
      color: #FFBF00;
    }
  `;

  return (
    <>
      <style>{optionStyles}</style>
      <ToastContainer />
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center' }}>
            <h3 style={headingStyle}>Add a New Workout</h3>
        </div>

        <label style={labelStyle}>Exercise Name:</label>
        <select style={inputStyle} onChange={(e) => setExerciseName(e.target.value)} value={exerciseName}>
          <option value="" disabled>Select an Exercise</option>
          <option value="Push-Ups">Push-Ups</option>
          <option value="Squats">Squats</option>
          <option value="Plank">Plank</option>
          <option value="Lunges">Lunges</option>
          <option value="Burpees">Burpees</option>
          <option value="Bicep Curls">Bicep Curls</option>
        </select>

        <label style={labelStyle}>Weight (in kg):</label>
        <input style={inputStyle} type="number" onChange={(e) => setWeight(e.target.value)} value={weight} />

        <label style={labelStyle}>Sets:</label>
        <input style={inputStyle} type="number" onChange={(e) => setSets(e.target.value)} value={sets} />

        <label style={labelStyle}>Reps:</label>
        <input style={inputStyle} type="number" onChange={(e) => setReps(e.target.value)} value={reps} />

        <label style={labelStyle}>Category:</label>
        <select style={inputStyle} onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="" disabled>Select a Category</option>
          <option value="Upper Body">Upper Body</option>
          <option value="Lower Body">Lower Body</option>
          <option value="Core">Core</option>
          <option value="Cardio / Full Body">Cardio / Full Body</option>
        </select>

        <button
          style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Add Workout
        </button>
      </form>
    </>
  );
};

export default WorkoutForm;