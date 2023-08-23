import { useState, useEffect } from "react";
import { NavBar } from "Layout/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { courseSchema } from "validation/course";
import { getCourse, editCourse } from "redux/slices/courseSlice";
import { showToastError, showToastSuccess } from "Utility/toastUtil";
export function EditCourse() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
  });

  useEffect(() => {
    dispatch(getCourse(id));
  }, [dispatch, id]);

  const initial = useSelector((state) => state.course.course);

  useEffect(() => {
    if (initial && initial.status === "success") {
      const initialData = {
        title: initial.data.title,
        description: initial.data.description,
        weeks: initial.data.weeks,
        tuition: initial.data.tuition,
        minimumSkill: initial.data.minimumSkill,
      };

      setData(initialData);
    }
  }, [initial]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newCourseData = {
      id: initial.data._id,
      title: data.title,
      description: data.description,
      weeks: data.weeks,
      tuition: data.tuition,
      minimumSkill: data.minimumSkill,
    };
    const response = await dispatch(editCourse(newCourseData, id));
    setLoading(false);
    if (response.payload.status === "success") {
      showToastSuccess("Course updated successfully!");
    } else if (response.payload.success === false) {
      showToastError(response.payload.errMsg);
    } else {
      showToastError("An error occurred.");
    }
  };

  const formik = useFormik({
    initialValues: data,
    validationSchema: courseSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <NavBar />
      <div className="container pb-5 pt-5">
        <div className="text-center">
          <h2 className="index-h2">Edit Course</h2>
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
                      value={data.title}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.title && formik.touched.title ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.title}
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
                      value={data.description}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.errors.description && formik.touched.description ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.description}
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
                      value={data.weeks}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.weeks && formik.touched.weeks ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.weeks}
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
                      value={data.tuition}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.tuition && formik.touched.tuition ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.tuition}
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
                      value={data.minimumSkill}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.minimumSkill &&
                    formik.touched.minimumSkill ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.minimumSkill}
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
                        Update Course
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
