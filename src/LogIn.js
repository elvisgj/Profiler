import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { logged } from "./actions";
import useFetch from "./useFetch";
import LoadingAnimation from "./Loading";
import { BASE_URL } from "./keys";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(7),
});

function Login(props) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState({});
  const options = {
    url: users.email ? `${BASE_URL}/auth/login` : null,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: users,
  };

  const { data, loading } = useFetch(options);
  if (data) {
    dispatch(logged(data));
    props.history.push("/home");
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <div
          className="bg-gradient-to-b from-green-100 to-blue-200 p-4 flex flex-col justify-center
          rounded-3xl  mt-12 w-80 h-96 shadow-2xl"
        >
          <div className="mb-8 text-center font-black italic text-2xl">
            Login
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={setUsers}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isValid,
              values,
              errors,
              touched,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="email" className="text-xl">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Type your email"
                      className="border-2 border-grey-200 h-8 rounded-2xl p-2 text-xs
                      focus:ring-2 focus:ring-blue-300 "
                    />
                    {errors.email && touched.email && (
                      <div>
                        <p className="text-red-500 text-xs pt-2 text-center">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="password" className="text-xl">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Type your password"
                      className="border-2 border-blue-200 h-8 rounded-2xl p-2 text-xs
                      focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.password && touched.password && (
                      <div>
                        <p className="text-red-500 text-xs pt-2 text-center">
                          {errors.password}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="submit"
                      value="Login"
                      disabled={!isValid || loading}
                      className="bg-gradient-to-r from-blue-400 to-blue-400
                      rounded-full px-12 m-4 text-white hover:from-blue-400 hover:via-blue-300 hover:to-blue-400"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
