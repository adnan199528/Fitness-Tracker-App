//update background with gradient 
import { useEffect, useState } from "react";
import { useMealsContext } from "../hooks/useMealsContext";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import MealDetails from "../components/MealDetails";
import MealForm from "../components/MealForm";

const Meals = () => {
  const { meals, dispatch } = useMealsContext();
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/api/meals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MEALS', payload: json });
      }
    };

    if (token) {
      fetchMeals();
    }
  }, [dispatch, token]);

  const filteredMeals =
    meals &&
    meals.filter((meal) => {
      const mealTypeMatch = meal.mealType.toLowerCase().includes(searchQuery.toLowerCase());
      const foodNameMatch = meal.foodItems.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return mealTypeMatch || foodNameMatch;
    });

  const hasMeals = meals && meals.length > 0;

  // --- Styles (Copied from Workout.js) ---
  const pageStyle = {
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(100vh - 70px)',
  };

  const formContainerStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')`, // Darker meal-related image
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
        <MealForm />
      </div>
      {hasMeals && (
        <div style={listContainerStyle}>
          <div style={headingContainerStyle}>
            <h3 style={headingStyle}>Your Meals</h3>
          </div>
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search by Meal Type or Food Name..."
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
                  <th style={tableHeaderStyle}>Meal Type</th>
                  <th style={tableHeaderStyle}>Food Name</th>
                  <th style={tableHeaderStyle}>Quantity</th>
                  <th style={tableHeaderStyle}>Calories</th>
                  <th style={tableHeaderStyle}>Protein </th>
                  <th style={tableHeaderStyle}>Carbs </th>
                  <th style={tableHeaderStyle}>Fats </th>
                  <th style={tableHeaderStyle}>Date</th>
                  <th style={{...tableHeaderStyle, borderRight: 'none'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals && filteredMeals.map((meal) => (
                  <MealDetails key={meal._id} meal={meal} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meals;