import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin, useWhoami } from "../../queries/authQueries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.scss";
import Input from "../../components/FormInputs/BigInput";
import Logo from "./Logo";
import GlobalSpinner from "../../components/GlobalSpinner";
import Button from "../../components/Button";
import loginSchema from "../../schemas/loginSchema";

const Login = () => {
  const [rememberMe, setRembemerMe] = useState(false);
  const checkCheckbox = (e) => {
    if (e.key === "Enter") {
      setRembemerMe(!rememberMe);
    }
  };

  const { mutate: login, isLoading, isError, error } = useLogin();
  const {
    data: me,
    isLoading: meLoading,
    isRefetching: meRefetching,
  } = useWhoami();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  return (
    <div className={styles.container}>
      {(isLoading || meLoading || meRefetching) && <GlobalSpinner />}
      <div className={styles.form}>
        <div className={styles.inner}>
          {/* MESSAGE */}
          <div className={styles.message}>
            <span>Welcome Back</span>
            <p>Welcome back! Please enter your details...</p>
          </div>
          {/* FORM CONTAINER */}
          <div className={styles.formWrapper}>
            <form action='submit' onSubmit={handleSubmit(login)}>
              <Input
                label='Email:'
                htmlFor='email'
                type='email'
                autocomplete='email'
                name='email'
                placeholder='Enter your Email'
                register={register("email", { required: true })}
              />
              <Input
                label='Password:'
                htmlFor='password'
                type='password'
                name='password'
                autocomplete='current-password'
                placeholder='Enter your Password'
                register={register("password", { required: true })}
                err={error?.response?.data?.message}
              />
              {/* OPTIONS */}
              <div className={styles.options}>
                <dir className={styles.remember}>
                  <input
                    type='checkbox'
                    checked={rememberMe}
                    onKeyPress={(e) => checkCheckbox(e)}
                  />
                  <label htmlFor='check'>Remember for 30 days</label>
                </dir>
                <div className={styles.forgotPw}>
                  <Link to='/forgotPassword'>Forgot Password</Link>
                </div>
              </div>
              {/* LOGIN BTN */}
              <div className={styles.btnContainer}>
                <Button type='submit' size='md'>
                  <span>Sign In</span>
                </Button>
              </div>
              {/* NO ACCOUNT LINK */}
              <div className={styles.noAccount}>
                <span>
                  Don't have an account ? <Link to='/register'>Sign Up</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
};

export default Login;
