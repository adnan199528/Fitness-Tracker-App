// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import './Profile.css';

// const Profile = () => {
//   const { user, setUser } = useAuth();
//   const [file, setFile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setUsername(user.username);
//     }
//   }, [user]);

//   useEffect(() => {
//     const originalBodyStyle = document.body.style.cssText;
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
//     document.body.style.background =
//       'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)';
//     document.body.style.backgroundRepeat = 'no-repeat';
//     document.body.style.backgroundSize = 'cover';
//     document.body.style.backgroundPosition = 'center';
//     document.body.style.minHeight = '100vh';

//     const style = document.createElement('style');
//     style.innerHTML = `
//       .profile-bg {
//         min-height: 100vh;
//         display: flex;
//         justify-content: center;
//         align-items: flex-start;
//         padding-top: 60px;
//         padding: 20px;
//       }
//       .profile-form {
//         background-color: rgba(0, 0, 0, 0.85);
//         border-radius: 20px;
//         padding: 60px;
//         width: 100%;
//         max-width: 380px;
//         box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
//         color: #fff;
//         text-align: center;
//       }
//       .profile-heading {
//         margin-bottom: 15px;
//         font-family: "Cinzel", serif;
//         font-size: 32px;
//         font-weight: bold;
//         color: #FFFFFF;
//         text-transform: uppercase;
//         letter-spacing: 2px;
//         text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
//       }
//       .profile-picture-section {
//         margin-bottom: 15px;
//       }
//       .profile-picture {
//         width: 120px;
//         height: 120px;
//         border-radius: 50%;
//         border: 4px solid #FFD700;
//         object-fit: cover;
//         margin-bottom: 10px;
//         box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
//       }
//       .profile-input, .edit-profile-form input {
//         width: 100%;
//         padding: 10px;
//         margin-bottom: 10px;
//         border-radius: 30px;
//         border: 2px solid #FFD700;
//         background-color: transparent;
//         color: #fff;
//         outline: none;
//         font-size: 14px;
//         text-align: center;
//       }
//       /* Placeholder styling */
//       .profile-input::placeholder,
//       .edit-profile-form input::placeholder {
//         font-size: 12px;   /* smaller placeholder */
//         color: #ccc;
        
        
//       }
//       /* File input styling */
//       input[type="file"] {
//         display: block;
//         margin: 0 auto;
//         text-align: center;
//         color: #fff;
//       }
//       input[type="file"]::-webkit-file-upload-button {
//         background: #FFD700;
//         border: none;
//         padding: 6px 12px;
//         border-radius: 20px;
//         cursor: pointer;
//         font-weight: bold;
//         color: #000;
//         margin-right: 10px;
//       }
//       /* Center align "No file chosen" text */
//       input[type="file"] {
      
//       }
//       .profile-btn {
//         padding: 10px 20px;
//         border-radius: 10px;
//         border: none;
//         background: linear-gradient(135deg, #FFD700, #B8860B, #FFD700);
//         color: #000;
//         font-weight: bold;
//         font-size: 14px;
//         cursor: pointer;
//         margin: 8px 5px;
//         transition: all 0.3s;
//       }
//       .profile-btn:hover {
//         box-shadow: 0 0 15px #FFD700;
//         transform: translateY(-2px);
//       }
//       .display-profile p {
//         color: #fff;
//         font-size: 16px;
//         margin: 8px 0;
//       }
//       .display-profile strong {
//         color: #FFD700;
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.body.style.cssText = originalBodyStyle;
//       if (style.parentNode) {
//         style.parentNode.removeChild(style);
//       }
//     };
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       return toast.error('Please select a file to upload.');
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(
//         'http://localhost:5000/api/users/profile-picture',
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setUser(res.data.user);
//       toast.success('Profile picture uploaded successfully!');
//     } catch (err) {
//       console.error('Error uploading profile picture:', err);
//       toast.error(
//         err.response?.data?.error || 'An error occurred while uploading.'
//       );
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put(
//         `http://localhost:5000/api/users/${user._id}`,
//         { name, username },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setUser(res.data.user);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Failed to update profile.');
//     }
//   };

//   if (!user) {
//     return (
//       <div className="profile-bg">
//         <p style={{ color: 'white', fontSize: '20px' }}>Loading user data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-bg">
//       <div className="profile-form">
//         <h2 className="profile-heading">User Profile</h2>
//         <div className="profile-picture-section">
//           <img
//             src={user.profilePicture || 'default-profile.png'}
//             alt="Profile"
//             className="profile-picture"
//           />
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="profile-input"
//           />
//           <button onClick={handleUpload} className="profile-btn">
//             Upload Picture
//           </button>
//         </div>

//         {isEditing ? (
//           <div className="edit-profile-form">
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//             />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//             />
//             <button onClick={handleUpdateProfile} className="profile-btn">
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="profile-btn"
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <div className="display-profile">
//             <p>
//               <strong>Name:</strong> {user.name}
//             </p>
//             <p>
//               <strong>Username:</strong> {user.username}
//             </p>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             <button onClick={() => setIsEditing(true)} className="profile-btn">
//               Edit Profile
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

//updated code 
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    const originalBodyStyle = document.body.style.cssText;
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background =
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.minHeight = '100vh';

    const style = document.createElement('style');
    style.innerHTML = `
      .profile-bg {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 60px;
        padding: 20px;
      }
      .profile-form {
        background-color: rgba(0, 0, 0, 0.85);
        border-radius: 20px;
        padding: 60px;
        margin-top:120px;
        width: 100%;
        max-width: 380px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        color: #fff;
        text-align: center;
      }
      .profile-heading {
        margin-bottom: 15px;
        font-family: "Cinzel", serif;
        font-size: 32px;
        font-weight: bold;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
      }
      .profile-input, .edit-profile-form input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 30px;
        border: 2px solid #FFD700;
        background-color: transparent;
        color: #fff;
        outline: none;
        font-size: 14px;
        text-align: center;
      }
      .profile-input::placeholder,
      .edit-profile-form input::placeholder {
        font-size: 12px;
        color: #ccc;
      }
      .profile-btn {
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        background: linear-gradient(135deg, #FFD700, #B8860B, #FFD700);
        color: #000;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        margin: 8px 5px;
        transition: all 0.3s;
      }
      .profile-btn:hover {
        box-shadow: 0 0 15px #FFD700;
        transform: translateY(-2px);
      }
      .display-profile p {
        color: #fff;
        font-size: 16px;
        margin: 8px 0;
      }
      .display-profile strong {
        color: #FFD700;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cssText = originalBodyStyle;
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        { name, username },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile.');
    }
  };

  if (!user) {
    return (
      <div className="profile-bg">
        <p style={{ color: 'white', fontSize: '20px' }}>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="profile-bg">
      <div className="profile-form">
        <h2 className="profile-heading">User Profile</h2>

        {isEditing ? (
          <div className="edit-profile-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <button onClick={handleUpdateProfile} className="profile-btn">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="profile-btn"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="display-profile">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button onClick={() => setIsEditing(true)} className="profile-btn">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

