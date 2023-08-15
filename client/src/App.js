import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Component imports
import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";

// Page imports
import Login from "./pages/Login";
import CrimeData from "./pages/CrimeData";
import DisplayAllReports from "./pages/DisplayAllReports";
import CreateReport from "./pages/CreateReport";
import UpdateReport from "./pages/UpdateReport";
import DisplayOneReport from "./pages/DisplayOneReport";
import About from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<CrimeData />} />
            <Route
              path="/reports"
              element={
                <RequireAuth>
                  <DisplayAllReports />
                </RequireAuth>
              }
            />
            <Route
              path="/report/new"
              element={
                <RequireAuth>
                  <CreateReport />
                </RequireAuth>
              }
            />
            <Route
              path="/report/:id"
              element={
                <RequireAuth>
                  <DisplayOneReport />
                </RequireAuth>
              }
            />
            <Route
              path="/report/edit/:id"
              element={
                <RequireAuth>
                  <UpdateReport />
                </RequireAuth>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
