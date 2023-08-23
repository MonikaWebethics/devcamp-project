import { useState, useEffect } from "react";
import { NavBar } from "Layout/NavBar";
import { Link } from "react-router-dom";
import { slice } from "lodash";
import { fetchCourse } from "redux/slices/courseSlice";
import { fetchUser } from "redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteCourse } from "redux/slices/courseSlice";
import { showToastError, showToastSuccess } from "Utility/toastUtil";

export function Courses() {
  const { bootCampId } = useParams();
  const { user } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourse(bootCampId));
    dispatch(fetchUser());
  }, [dispatch, bootCampId]);

  const { isLoading, courseList: data } = useSelector((state) => {
    return state.course;
  });

  const { isLoading: isLoadingUser, user: userData } = useSelector((state) => {
    return state.user;
  });

  const [index, setIndex] = useState(4);
  const initialData = data?.data ? slice(data.data, 0, index) : [];
  const loadMore = () => {
    setIndex(index + 4);
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteCourse(id));
    if (response.payload.success === true) {
      showToastSuccess(response.payload.msg);
      dispatch(fetchCourse(bootCampId));
    } else if (response.payload.response.data.success === false) {
      showToastError(response.payload.response.data.errMsg);
    } else {
      showToastError("An error occurred.");
    }
  };

  return (
    <>
      <NavBar />
      {isLoading && isLoadingUser ? (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="container">
          <div className="row py-4">
            <div className="col text-end">
              {user === userData.id ? (
                <Link
                  to={`/addcourse/${bootCampId}`}
                  className="btn btn-outline-success"
                >
                  Add Course
                </Link>
              ) : null}
            </div>
          </div>
          <div className="row">
            <h1 className="text-center">Courses List</h1>

            {initialData.map((item, index) => {
              return (
                <div key={index} className="col-6 p-5">
                  <div className="card bg-success text-white">
                    <div className="card-header">
                      {item.title.toUpperCase()}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.weeks} Weeks</h5>
                      <p className="card-text">
                        {item.description.slice(0, 60)}
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">₹ {item.tuition}</li>
                      <li className="list-group-item">{item.minimumSkill}</li>
                    </ul>
                  </div>
                  <div className="row pt-3">
                    {user === userData.id ? (
                      <>
                        <div className="col-6 text-end">
                          <Link
                            className="btn btn-info"
                            to={`/editcourse/${item._id}`}
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-6">
                          <button
                            onClick={() => {
                              const shouldDelete = window.confirm(
                                "Are you sure you want to delete this course?"
                              );
                              if (shouldDelete) {
                                handleDelete(item._id);
                              }
                            }}
                            type="button"
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })}
            {initialData.length === 0 ? (
              <div className="text-center p-5">
                <h2 className="alert alert-primary">No Course Added yet</h2>
              </div>
            ) : (
              <div className="row d-grid mt-3 mb-5">
                {initialData.length < data.data.length && (
                  <div className="col-12 text-center">
                    <button
                      onClick={loadMore}
                      type="button"
                      className="btn btn-lg btn-dark"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
