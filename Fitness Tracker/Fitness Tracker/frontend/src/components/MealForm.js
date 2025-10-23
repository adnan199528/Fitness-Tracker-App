
//update background with gradient 
import { useState } from 'react';
import { useMealsContext } from '../hooks/useMealsContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MealForm = () => {
  const { dispatch } = useMealsContext();
  const { user, token } = useAuth();

  const [mealType, setMealType] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    // Validation for empty fields
    if (!mealType || !name || !quantity || !calories || !protein || !carbs || !fats) {
      toast.error("please fill in all feilds");
      return;
    }

    const meal = {
      mealType,
      foodItems: [{ name, quantity, calories, protein, carbs, fats }]
    };

    const response = await fetch('/api/meals', {
      method: 'POST',
      body: JSON.stringify(meal),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      setMealType('');
      setName('');
      setQuantity('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
      dispatch({type: 'CREATE_MEAL', payload: json});
      toast.success('add new meals successfully');
    }
  }

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

  const optionStyles = `
    select option {
      background: #333;
      color: #FFBF00;
    }
  `;

  return (
    <>
      <style>{optionStyles}</style>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={headingStyle}>Add a New Meal</h3>
        </div>

        <label style={labelStyle}>Meal Type:</label>
        <select style={inputStyle} onChange={(e) => setMealType(e.target.value)} value={mealType}>
          <option value="" disabled>Select Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>

        <label style={labelStyle}>Food Name:</label>
        <select style={inputStyle} name="name" onChange={(e) => setName(e.target.value)} value={name}>
          <option value="" disabled>Select Food</option>
          <option value="Oatmeal">Oatmeal</option>
          <option value="Boiled Eggs">Boiled Eggs</option>
          <option value="Brown Bread">Brown Bread</option>
          <option value="Yogurt with Fruits">Yogurt with Fruits</option>
          <option value="Grilled Chicken">Grilled Chicken</option>
          <option value="Rice with Vegetables">Rice with Vegetables</option>
          <option value="Lentil Soup (Daal)">Lentil Soup (Daal)</option>
          <option value="Salad">Salad</option>
          <option value="Baked Fish">Baked Fish</option>
          <option value="Chicken Curry with Roti">Chicken Curry with Roti</option>
          <option value="Mixed Vegetable Curry">Mixed Vegetable Curry</option>
          <option value="Quinoa / Brown Rice">Quinoa / Brown Rice</option>
          <option value="Fruit Salad">Fruit Salad</option>
          <option value="Nuts (Almonds, Walnuts)">Nuts (Almonds, Walnuts)</option>
          <option value="Protein Bar">Protein Bar</option>
          <option value="Smoothie">Smoothie</option>
        </select>

        <label style={labelStyle}>Quantity:</label>
        <input style={inputStyle} type="number" min="0" onChange={(e) => setQuantity(e.target.value)} value={quantity} placeholder="" />
        
        <label style={labelStyle}>Calories:</label>
        <input style={inputStyle} type="number" min="0" onChange={(e) => setCalories(e.target.value)} value={calories} placeholder="" />
        
        <label style={labelStyle}>Protein:</label>
        <input style={inputStyle} type="number" min="0" onChange={(e) => setProtein(e.target.value)} value={protein} placeholder="" />
        
        <label style={labelStyle}>Carbs :</label>
        <input style={inputStyle} type="number" min="0" onChange={(e) => setCarbs(e.target.value)} value={carbs} placeholder="" />
        
        <label style={labelStyle}>Fats:</label>
        <input style={inputStyle} type="number" min="0" onChange={(e) => setFats(e.target.value)} value={fats} placeholder="" />

        <button style={buttonStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Add Meal</button>
      </form>
    </>
  )
}

export default MealForm;