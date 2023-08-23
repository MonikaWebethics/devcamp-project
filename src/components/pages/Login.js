import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "validation/login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAxios } from "helpers/useAxios";
import { setToken } from "Utility/token";
import { showToastError } from "Utility/toastUtil";
const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await useAxios.post("/auth/login", values);
          const token = response.data.token;
          setToken(token);
          navigate("/");
        } catch (error) {
          if (error.response.status === 400) {
            showToastError(error.response.data.errMsg);
          } else {
            showToastError("An error occurred.");
          }
        }
        setLoading(false);
      },
    });
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Login in</h3>
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.email && touched.email ? (
                        <p className="form-error text-danger">{errors.email}</p>
                      ) : null}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.password && touched.password ? (
                        <p className="form-error text-danger">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>

                    <div className="form-check d-flex justify-content-start mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                      />
                      <label className="form-check-label">
                        {" "}
                        Remember password{" "}
                      </label>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                    {!loading ? null : (
                      <div className="pt-2">
                        <div className="spinner-border" role="status"></div>
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <Link to="/signup" className="link-danger">
                        Register
                      </Link>
                    </div>
                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
