import React from "react";
import styles from "./Register.module.scss";
import Logo from "./Logo";
import Input from "../../components/FormInputs/BigInput";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GlobalSpinner from "../../components/GlobalSpinner";
import registerSchema from "../../schemas/registerSchema";
import { useWhoami, useRegister } from "../../queries/authQueries";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { data, mutate: Register, isLoading, isError, error } = useRegister();
  const {
    data: me,
    isLoading: meLoading,
    isRefetching: meRefetching,
  } = useWhoami();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.inner}>
          {/* MESSAGE */}
          <div className={styles.message}>
            <span>Welcome !</span>
            <p>Please enter your details for the registration...</p>
          </div>
          {/* FORM */}
          <div className={styles.formWrapper}>
            <form action='submit' onSubmit={handleSubmit(Register)}>
              {/* NAME */}
              <div className={styles.nameContainer}>
                <div className={styles.nameInner}>
                  <Input
                    label='First Name:'
                    htmlFor='fname'
                    placeholder='First Name'
                    register={register("firstName", { required: true })}
                    err={errors?.firstName?.message}
                  />
                  <Input
                    label={"Last Name:"}
                    htmlFor={"lname"}
                    placeholder={"Last Name"}
                    register={register("lastName", { required: true })}
                    err={errors?.lastName?.message}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <Input
                label='Email:'
                htmlFor='email'
                type='email'
                autoComplete='email'
                placeholder='Enter your Email'
                register={register("email", { required: true })}
                err={errors?.email?.message}
              />

              {/* PASSWORD */}
              <Input
                label='Password:'
                htmlFor='password'
                type='password'
                autoComplete='current-password'
                placeholder='Enter your Password'
                register={register("password", { required: true })}
                err={errors?.password?.message}
              />

              {/* CONFIRM PASSWORD */}
              <Input
                label='Confirm Password:'
                htmlFor='confirmPassword'
                type='password'
                autoComplete='current-password'
                placeholder='Confirm your Password'
                register={register("confirmPassword", { required: true })}
                err={errors?.confirmPassword?.message}
              />

              {/* ROLE */}
              <div className={styles.roleContainer}>
                <label htmlFor='role'>Role :</label>
                <dir className={styles.selectContainer}>
                  <select name='role' {...register("role", { required: true })}>
                    <option value='PATIENT'>Patient</option>
                    <option value='DOCTOR'>Doctor</option>
                  </select>
                </dir>
              </div>

              {/* ACTIONS */}
              <div className={styles.btnContainer}>
                <Button type='submit'>
                  <span>Sign Up</span>
                </Button>
              </div>
              <div className={styles.accountExists}>
                <span>
                  Have an account? <Link to='/login'>Sign In</Link>
                </span>
              </div>

              {/* ERRORS */}
              {error && (
                <div className={styles.err}>
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Logo />
      {(isLoading || meLoading || meRefetching) && <GlobalSpinner />}
    </div>
  );
};

export default Register;
