import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();


  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    console.log('pyload:',payload);
    setErrors(null);
    axiosClient.post('/login', payload)
      .then((data) => {
        setUser(data.data.user)
        setToken(data.data.token)
        console.log('response check:', data.data.user)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status == 422) {
          console.log(response.data);
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else{
            setErrors({
              email: [response.data.message]
            });

          }
        }
      })
  }

  return (
      <div className="login-signup-form animated fadeInDown">
          <div className="form">
            <form onSubmit={onSubmit}>
              <h1 className="title">Login</h1>

              {errors && (
                <div className="alert">
                  {Object.keys(errors).map(key => (
                    <p key={key}>
                      {errors[key][0]} {/* Use errors[key] instead of errors.key */}
                    </p>
                  ))}
                </div>
              )}

              <input ref={emailRef} type="email" placeholder="Email" />
              <input ref={passwordRef} type="password" placeholder="Password" />
              <button className="btn btn-block">Login</button>

              <p className="message">
                Not Registered <Link to="/signup">Create an account</Link>
              </p>
            </form>
          </div>
      </div>
  )
}

export default Login;
