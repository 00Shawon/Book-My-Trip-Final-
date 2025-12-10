import React from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from "react-router";
import SocialLoagin from '../SocialLogin.jsx/SocialLoagin';
import useAuth from '../../../Hooks/useAuth';


const Login = () => {
  const {register,handleSubmit, formState:{errors}} = useForm();
  const {signInUser} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogin = (data) => {
console.log('form data', data)
signInUser(data.email,data.password)
.then(result => {
  console.log(result.user)
  navigate(location?.state||'/')
})
.catch(err => {
  console.log(err)
})
  }


    return (
        <div className='max-w-[380px] mx-auto' >
<h3 className='text-center text-3xl'>Welcome Back</h3>
<h3 className='text-center'>PLease Login</h3>
          <form className=' card  p-8 shadow-xl' onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
                {/* email field */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
    {errors.email?.type === "required" && (
          <p className="text-red-500">Email is Required</p>
        )}




          {/* password field */}
          <label className="label">Password</label>
          <input type="password"  {...register('password', {required:true,minLength: 6} )}  className="input" placeholder="Password" />

        {
          errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
        }
      
   {errors.password?.type === "minLength" && (
          <p className="text-red-500">Password must be at least 6 characters</p>
        )}

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
      <SocialLoagin></SocialLoagin>
        </fieldset>
        <p>New to zapShift? <Link state={location.state} className='text-blue-500 underline' to='/register'>Register</Link></p>
          </form>
        </div>
    );
};

export default Login;