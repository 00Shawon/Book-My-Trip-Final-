import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import SocialLoagin from "../SocialLogin.jsx/SocialLoagin";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const {registerUser,updateUserProfile} = useAuth();
const location = useLocation();
const navigate = useNavigate();
const axiosSecure = useAxiosSecure();
// console.log('in register', location)


  const handleRegistration = (data) => {
    console.log('after registration',data.photo[0])
const profileImage = data.photo[0];


    registerUser(data.email, data.password)
    .then(result => {
      console.log(result.user)
      navigate(location.state||'/')
      // store the image in form data
const fromData = new FormData();
fromData.append('image',profileImage)

//send the data to store and get the url

const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

axios.post(imgApiUrl, fromData)
.then(res => {
  console.log('after image upload', res.data.data.url )
  const photoURL = res.data.data.url

  //create user in the database
const userInfo = {
  email: data.email,
  displayName: data.name,
   photoURL: photoURL,
}
  axiosSecure.post('/users', userInfo)
  .then(res => {
    if(res.data.insertedId){
      console.log('user created in the database')
    }
  })

  
  // updating user profile to firebase
  const userProfile = {
    displayName: data.name,
    photoURL: photoURL,
  }
  updateUserProfile(userProfile)
  .then(console.log('user profile updated'))
  .catch(err => console.log(err.code))
})

    })
    .catch(err => {
      console.log(err.code)
    })
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <fieldset className="fieldset">
        {/* name field  */}
        <label className="label">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="input"
          placeholder="Name"
        />
        {errors.name?.type === "required" && (
          <p className="text-red-500">Name is Required</p>
        )}


        {/* photo image field  */}
        <label className="label">Photo</label>
   
        <input
          type="file"
          {...register("photo", { required: true })}
          className="file-input"
          placeholder="Photo"
        />
        {errors.photo?.type === "required" && (
          <p className="text-red-500">Photo is Required</p>
        )}



        {/* email field  */}
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="input"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500">Email is Required</p>
        )}




        {/* password field  */}
        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!?]).{8,}$/
 })}
          className="input"
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500">Password is Required</p>
        )}

        {errors.password?.type === "minLength" && (
          <p className="text-red-500">Password must be at least 6 characters</p>
        )}

        {errors.password?.type === "pattern" && (
          <p className="text-red-500">Password must have at least 1 uppercase , 1 lowercase , 1  number and 1 spacial character</p>
        )}
    
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Register</button>
       <SocialLoagin></SocialLoagin>
      </fieldset>
        <p>New to zapShift</p> <Link className='text-blue-500' to='/login'>Signin</Link>
    </form>
  );
};

export default Register;
