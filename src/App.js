import "./App.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { Router } from "routes";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
