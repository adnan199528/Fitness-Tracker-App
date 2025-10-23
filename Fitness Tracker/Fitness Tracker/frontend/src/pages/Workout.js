///updated code with background image and gradient 
import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuth } from "../context/AuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Workout = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (token) {
      fetchWorkouts();
    }
  }, [dispatch, token]);

  const filteredWorkouts =
    workouts &&
    workouts.filter(
      (workout) =>
        (workout.exerciseName &&
          workout.exerciseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (workout.category &&
          workout.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const hasWorkouts = workouts && workouts.length > 0;

  // --- Styles ---
  const pageStyle = {
    // This style makes the component break out of its container's width restrictions
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(100vh - 70px)',
  };

  const formContainerStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')`,
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
      <div style={formContainerStyle}>
        <WorkoutForm />
      </div>
      {hasWorkouts && (
        <div style={listContainerStyle}>
          <div style={headingContainerStyle}>
            <h3 style={headingStyle}>Your Workouts</h3>
          </div>
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search by Exercise Name or Category..."
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
                  <th style={tableHeaderStyle}>Exercise Name</th>
                  <th style={tableHeaderStyle}>Weight (kg)</th>
                  <th style={tableHeaderStyle}>Sets</th>
                  <th style={tableHeaderStyle}>Reps</th>
                  <th style={tableHeaderStyle}>Category</th>
                  <th style={tableHeaderStyle}>Date</th>
                  <th style={{...tableHeaderStyle, borderRight: 'none'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts && filteredWorkouts.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;