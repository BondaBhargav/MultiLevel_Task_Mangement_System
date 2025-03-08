// import React, { useState } from 'react';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { useLoginApiMutation } from './Service/productApi';
// import {  toast, ToastContainer,Bounce } from 'react-toastify';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
// const[loginApiFn]=useLoginApiMutation()
//   const navigate = useNavigate();


//   let token =window.localStorage.getItem("token")

//   if(token){
//   return(<Navigate to="/"/>)
//   }
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//         if (!email || !password) {
//             setError('Please fill in all fields');
//             return;
//           }
//           let respone=await loginApiFn({email,password})
      
//       if(respone?.data?.success){
//       window.localStorage.setItem('token',respone.data.token)
//       toast.success("login success")

//       navigate("/")

//       }
//       else if(respone?.error?.data?.message){
//         toast.error(respone?.error?.data?.message)
//       }
//       else{
//         toast.error('something went wrong')


//       }
   
//     } catch (error) {
//         console.log("error in login",error)
//         toast.error('something went wrong')
      
//     }

//   };
  

//   return (
//     <div className="auth-container">
     
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p className="error">{error}</p>}
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;