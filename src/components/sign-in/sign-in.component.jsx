import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSignIn = async (event) => {
    event.preventDefault();

    emailSignInStart({ email, password });
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div>
      <h1>Login</h1>
      <span>
        If you did not login in the past, account will be automatically created
      </span>

      <form onSubmit={handleSignIn}>
        <FormInput
          required
          type='email'
          label='email'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
        <FormInput
          required
          type='password'
          label='password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <div>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton type='button' onClick={googleSignInStart}>
            Sign in with google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart(email, password)),
});

export default connect(null, mapDispatchToProps)(SignIn);
