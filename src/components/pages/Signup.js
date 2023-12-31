import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "validation/signup";
import { Link } from "react-router-dom";
import { useAxios } from "helpers/useAxios";
import { showToastError, showToastSuccess } from "Utility/toastUtil";

export function Signup() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const [loading, setLoading] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await useAxios.post("/auth/ragister", values);
          action.resetForm();
          showToastSuccess(response.data.msg);
        } catch (error) {
          if (error.response && error.response.data) {
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
                  <h3 className="mb-5">Sign Up</h3>

                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      {errors.name && touched.name ? (
                        <p className="form-error text-danger">{errors.name}</p>
                      ) : null}
                    </div>

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
                    <div className="form-outline mb-4 pb-1">
                      <label className="form-label">Role</label>
                      <select
                        id="roleSelect"
                        className="form-select"
                        aria-label="Select Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // value={selectedRole}
                        // onChange={handleRoleChange}
                      >
                        <option value="user">user</option>
                        <option value="publisher">publisher</option>
                      </select>

                      {errors.password && touched.password ? (
                        <p className="form-error text-danger">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Signup
                    </button>
                    {!loading ? null : (
                      <div className="pt-2">
                        <div className="spinner-border" role="status"></div>
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-center pb-4 pt-2">
                      <p className="mb-0 me-2">Already have an account?</p>
                      <Link to="/login" className="link-danger">
                        Login
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
