
//update background with gradient 
import { useMealsContext } from '../hooks/useMealsContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealDetails = ({ meal }) => {
  const { dispatch } = useMealsContext();
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeal, setEditedMeal] = useState({ ...meal });
  const [error, setError] = useState(null);

  // Hover states
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isUpdateHovered, setIsUpdateHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  const handleDelete = async () => {
    if (!token) {
      toast.error("You must be logged in to delete a meal.");
      return;
    }

    const response = await fetch('/api/meals/' + meal._id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_MEAL', payload: json });
      toast.success("delete meals successfully");
    } else {
      toast.error(json.error || "Failed to delete meal.");
    }
  };

  const handleEdit = () => {
    // Flatten the structure for editing
    const flatMeal = {
      _id: meal._id,
      mealType: meal.mealType,
      name: meal.foodItems[0].name,
      quantity: meal.foodItems[0].quantity,
      calories: meal.foodItems[0].calories,
      protein: meal.foodItems[0].protein,
      carbs: meal.foodItems[0].carbs,
      fats: meal.foodItems[0].fats,
    };
    setEditedMeal(flatMeal);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to update a meal.");
      toast.error("You must be logged in to update a meal.");
      return;
    }

    // Re-nest the structure for the API
    const mealToUpdate = {
      mealType: editedMeal.mealType,
      foodItems: [{
        name: editedMeal.name,
        quantity: editedMeal.quantity,
        calories: editedMeal.calories,
        protein: editedMeal.protein,
        carbs: editedMeal.carbs,
        fats: editedMeal.fats,
      }]
    };

    const response = await fetch('/api/meals/' + meal._id, {
      method: "PATCH",
      body: JSON.stringify(mealToUpdate),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      toast.error(json.error || "Failed to update meal.");
    } else {
      dispatch({ type: "UPDATE_MEAL", payload: json });
      setIsEditing(false);
      setError(null);
      toast.success("update meals successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMeal(prev => ({ ...prev, [name]: value }));
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
  const optionStyles = `select option { background: #333; color: #FFBF00; }`;

  if (isEditing) {
    return (
      <tr style={trStyle}>
        <td colSpan="9" style={{ padding: '10px', background: 'transparent' }}>
          <style>{optionStyles}</style>
          <form onSubmit={handleUpdate} style={editFormStyle}>
            <div style={{ textAlign: 'center' }}><h3 style={editHeadingStyle}>Edit Meal</h3></div>
            
            <label style={editLabelStyle}>Meal Type:</label>
            <select name="mealType" style={editInputStyle} onChange={handleChange} value={editedMeal.mealType}>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
            
            <label style={editLabelStyle}>Food Name:</label>
            <select name="name" style={editInputStyle} onChange={handleChange} value={editedMeal.name}>
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
            
            <label style={editLabelStyle}>Quantity :</label>
            <input name="quantity" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedMeal.quantity} />
            
            <label style={editLabelStyle}>Calories:</label>
            <input name="calories" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedMeal.calories} />
            
            <label style={editLabelStyle}>Protein :</label>
            <input name="protein" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedMeal.protein} />
            
            <label style={editLabelStyle}>Carbs:</label>
            <input name="carbs" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedMeal.carbs} />
            
            <label style={editLabelStyle}>Fats :</label>
            <input name="fats" style={editInputStyle} type="number" min="0" onChange={handleChange} value={editedMeal.fats} />

            <div style={buttonContainerStyle}>
              <button type="submit" style={updateBtnStyle} onMouseEnter={() => setIsUpdateHovered(true)} onMouseLeave={() => setIsUpdateHovered(false)}>Update Meal</button>
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
      <td style={tdStyle}>{meal.mealType}</td>
      <td style={tdStyle}>{meal.foodItems[0].name}</td>
      <td style={tdStyle}>{meal.foodItems[0].quantity}</td>
      <td style={tdStyle}>{meal.foodItems[0].calories}</td>
      <td style={tdStyle}>{meal.foodItems[0].protein}</td>
      <td style={tdStyle}>{meal.foodItems[0].carbs}</td>
      <td style={tdStyle}>{meal.foodItems[0].fats}</td>
      <td style={tdStyle}>{new Date(meal.createdAt).toLocaleString()}</td>
      <td style={{ ...tdStyle, textAlign: 'center', borderRight: 'none' }}>
        <button style={editIconStyle} onClick={handleEdit} onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}><FaEdit /></button>
        <span style={{ margin: '0 10px' }}></span>
        <button style={deleteIconStyle} onClick={handleDelete} onMouseEnter={() => setIsDeleteHovered(true)} onMouseLeave={() => setIsDeleteHovered(false)}><FaTrash /></button>
      </td>
    </tr>
  );
};

export default MealDetails;