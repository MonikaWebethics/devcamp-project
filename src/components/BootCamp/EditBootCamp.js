import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBootCamp, editBootCamp } from "redux/slices/bootCampSlice";
import { NavBar } from "Layout/NavBar";
import { useFormik } from "formik";
import { bootCampSchema } from "validation/BootCamp";
import { showToastError, showToastSuccess } from "Utility/toastUtil";
export function EditBootCamp() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
  });

  const initial = useSelector((state) => state.bootCamp.bootCamp);

  useEffect(() => {
    dispatch(getBootCamp(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (initial && initial.success === true) {
      const initialData = {
        title: initial.data.name,
        description: initial.data.description,
        website: initial.data.website,
        phone: initial.data.phone,
        email: initial.data.email,
        address: initial.data.location.formattedAddress,
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
    const newBootCampData = {
      id: initial.data.id,
      name: data.title,
      description: data.description,
      website: data.website,
      phone: data.phone,
      email: data.email,
      address: data.address,
    };

    const response = await dispatch(editBootCamp(newBootCampData, id));
    setLoading(false);
    if (response.payload.success === true) {
      showToastSuccess("Bootcamp updated successfully!");
    } else if (response.payload.success === false) {
      showToastError(response.payload.errMsg);
    } else {
      showToastError("An error occurred.");
    }
  };
  const formik = useFormik({
    initialValues: data,
    validationSchema: bootCampSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <NavBar />
      <div className="container pb-5 pt-5">
        <div className="text-center">
          <h2 className="index-h2">Edit BootCamp</h2>
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
                      placeholder="BootCamp title"
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
                      name="website"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="website"
                      value={data.website}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.website && formik.touched.website ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.website}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="phone"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="Phone Number"
                      value={data.phone}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="email"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="email"
                      value={data.email}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="pb-4">
                    <input
                      type="text"
                      name="address"
                      className="form-control "
                      style={{ height: "52px" }}
                      placeholder="address"
                      value={data.address}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.address && formik.touched.address ? (
                      <p className="ps-2 form-error text-danger">
                        {formik.errors.address}
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
                        Edit BootCamp
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
