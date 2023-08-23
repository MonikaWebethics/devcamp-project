import { useEffect, useState } from "react";
import { slice } from "lodash";
import { NavBar } from "Layout/NavBar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBootCamp } from "redux/slices/bootCampSlice";
import { fetchUser } from "redux/slices/userSlice";
import { deleteBootCamp } from "redux/slices/bootCampSlice";
import { showToastError, showToastSuccess } from "Utility/toastUtil";

export function BootCamp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBootCamp());
    dispatch(fetchUser());
  }, [dispatch]);

  const { isLoading, bootCampList: data } = useSelector((state) => {
    return state.bootCamp;
  });
  const { isLoading: isLoadingUser, user } = useSelector((state) => {
    return state.user;
  });

  const handleDelete = async (id) => {
    const response = await dispatch(deleteBootCamp(id));
    console.log(response);
    if (response.payload.success === true) {
      showToastSuccess("BootCamp Deleted successfully!");
      dispatch(fetchBootCamp());
    } else if (response.payload.response.data.success === false) {
      showToastError(response.payload.response.data.errMsg);
    } else {
      showToastError("An error occurred.");
    }
  };

  const [index, setIndex] = useState(4);
  const initialData = slice(data.data, 0, index);

  const loadMore = () => {
    setIndex(index + 4);
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
              <Link to="/addbootcamp" className="btn btn-outline-success">
                Add BootCamp
              </Link>
            </div>
          </div>
          <div className="row">
            <h1 className="text-center">BootCamp List</h1>
            {initialData.map((item, index) => {
              return (
                <div key={index} className="col-6 p-5">
                  <Link
                    to={`/courses/${item.id}/${item.user}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card bg-success text-white">
                      <div className="card-header">
                        {item.name.toUpperCase()}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.email}</h5>
                        <p className="card-text">
                          {item.description.slice(0, 40)}
                        </p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">{item.phone}</li>
                        <li className="list-group-item">{item.website}</li>
                        <li className="list-group-item">
                          {item.location.formattedAddress}
                        </li>
                      </ul>
                    </div>
                  </Link>

                  <div className="row pt-3">
                    {item.user === user.id ? (
                      <>
                        <div className="col-6 text-end">
                          <Link
                            className="btn btn-info"
                            to={`/editbootcamp/${item.id}`}
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-6 ">
                          <button
                            onClick={() => {
                              const shouldDelete = window.confirm(
                                "Are you sure you want to delete this bootcamp?"
                              );
                              if (shouldDelete) {
                                handleDelete(item.id);
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
          </div>

          <div className="row d-grid mt-3 mb-5">
            {initialData &&
            data.data &&
            initialData.length < data.data.length ? (
              <div className="col-12 text-center">
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-lg btn-dark"
                >
                  Load More
                </button>
              </div>
            ) : (
              <div className="text-center p-5">
                <h2 className="alert alert-primary">No More Data</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
