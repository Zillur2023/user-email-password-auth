import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("One character should be uppercase");
      return;
    } else if (!accepted) {
      setRegisterError("Accepted our Terms and Conditions");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created successfully");
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => console.log('Profile updated'))
        sendEmailVerification(result.user) 
          .then(() => {
            alert('Please check your email and verify your account')
          })
         
        
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="border">
      <div className="max-w-[500px] mx-auto mt-10  p-10 rounded-mdl">
        <h2 className="text-3xl text-center">Please register</h2>
        <br />
        <form onSubmit={handleRegister} className="flex flex-col gap-2 text-center">
          <input
             className="w-full px-3 py-2 rounded-md bg-zinc-300"
            placeholder="name "
            type="text"
            name="name"
            id=""
            required
          />
          <input
             className="w-full px-3 py-2 rounded-md bg-zinc-300"
            placeholder="Email "
            type="email"
            name="email"
            id=""
            required
          />{" "}
          
          <div className="relative">
            <input
                className="w-full px-3 py-2 rounded-md bg-zinc-300"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              required
            />
            <span
              className="absolute -translate-y-1/2 right-5 top-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {" "}
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}{" "}
            </span>
          </div>
          <div className="flex justify-start items-center gap-3 font-medium">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              Accept our <a href="">Terms and Conditions</a>
            </label>
          </div>
          <input
           className="w-full px-3 py-2 rounded-md bg-secondary text-white"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && (
          <p className="text-red-700 font-medium"> {registerError} </p>
        )}
        {success && <p className="text-green-700 font-medium"> {success} </p>}
        <p>All ready have an account. Please <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
