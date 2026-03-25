import AppRoutes from "./routes/AppRoutes";
import { Bounce, ToastContainer } from "react-toastify";

import { App as AntApp } from "antd";

function App() {
  return (
    <AntApp>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </AntApp>
  );
}

export default App;
