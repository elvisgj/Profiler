import React from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { BASE_URL } from "./keys";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(7),
});

const registerUser = async (values) => {
  const userRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  };
  const registerRequest = await fetch(`${BASE_URL}/auth/register`, userRequest);
  const body = await registerRequest.json();
  console.log(body);
};

function SignIn() {
  return (
    <div>
      <div className="flex justify-center">
        <div
          className="bg-gradient-to-b from-green-100 to-blue-200 p-4 flex flex-col justify-center
          rounded-3xl  mt-12 w-80 h-96 shadow-2xl"
        >
          <div className="mb-8 text-center text- font-black italic text-2xl">
            Sign in
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => registerUser(values)}
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
                      className="border-2 border-blue-200 p-2 h-8 rounded-2xl text-xs
                      focus:ring-2 focus:ring-blue-300"
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
                      className="border-2 border-blue-200 p-2 h-8 rounded-2xl text-xs
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
                      type="button"
                      value="Sign in"
                      disabled={!isValid}
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-blue-400 to-blue-400
                      rounded-full px-12 m-4 text-white
                  hover:from-blue-400 hover:via-blue-300 hover:to-blue-400 shadow-2xl"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div>
            <p className="text-sm text-center">
              Already have an account?
              <Link
                className="text-gray-600 ml-2 hover:text-gray-900"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
