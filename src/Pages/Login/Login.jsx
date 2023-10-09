import { useRef, useState } from "react";
import auth from "../../Firebase/Firebase.config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";


const Login = () => {
  const [loginError, setLoginError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef(null)


    const handleLogin = e => {
          e.preventDefault()
        const email = e.target.email.value 
        const password = e.target.password.value 
        console.log(email, password)
        setLoginError('')
        setSuccess('')
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user)
          if(result.user.emailVerified) {
            setSuccess('User Login Success')
          }
          else{
            alert('Please verify your email address')
          }
        })
        .catch(error => {
          console.log(error)
          setLoginError(error.message)
        })
    }
    const handleForgetPassword = () => {
      const email = emailRef.current.value 
      if(!email) {
        console.log('Please provide an email', emailRef.current.value)
        return
      }
      else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        console.log('Please write a valid email')
        return
      }
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please check your email')
      })
      .catch(error => {
        console.log(error)
      })
      
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
            <form onSubmit={handleLogin}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input ref={emailRef} type="text" name="email" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {
                loginError && <p className="text-red-700 font-medium"> {loginError} </p>
            } 
            {
                success && <p className="text-green-700 font-medium"> {success} </p>
            }
            <p>New to this website? Please <Link to='/register'>Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;