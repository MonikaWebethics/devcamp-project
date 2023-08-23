import { useState } from "react";
import { NavBar } from "Layout/NavBar";
import { addCourse } from "redux/slices/courseSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { courseSchema } from "validation/course";
import { showToastError, showToastSuccess } from "Utility/toastUtil";

export function AddCourse() {
  const { bootCampId } = useParams();
  const dispatch = useDispatch();
  const initialValues = {
    bootcamp_id: bootCampId,
    title: "",
    description: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
  };

  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: courseSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        const response = await dispatch(addCourse(values));
        if (response.payload.status === "success") {
          showToastSuccess(response.payload.msg);
          action.resetForm();
        } else if (response.payload.success === false) {
          showToastError(response.payload.errMsg);
        } else {
          showToastError("An error occurred.");
        }
        setLoading(false);
      },
    });

  return (
    <>
      <NavBar />
      <div className="container pb-5 pt-5">
        <div className="text-center">
          <h2 className="index-h2">Add Course</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row pb-5 pt-3">
            <div className="col py-5 border rounded-3">
              <div className="ps-3" style={{ width: "50%" }}>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="title"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="Title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.title && touched.title ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.title}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Description..."
                      className="form-control"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.description && touched.description ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="weeks"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="Time Period"
                      value={values.weeks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.weeks && touched.weeks ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.weeks}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="tuition"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="Course Fees"
                      value={values.tuition}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.tuition && touched.tuition ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.tuition}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="minimumSkill"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="Minimum Skill"
                      value={values.minimumSkill}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.minimumSkill && touched.minimumSkill ? (
                      <p className="ps-2 form-error text-danger">
                        {errors.minimumSkill}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="d-grid pt-4 pb-3 gap-6 mx-auto pt-2">
                  <div className="row">
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-success rounded-0"
                        style={{ height: "44px", width: "156px" }}
                      >
                        Add Course
                      </button>
                    </div>
                    <div className="col-4">
                      {!loading ? null : (
                        <div className="spinner-border" role="status"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
