import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Admin/Dashboard";
import Profile from "../pages/Admin/Profile";
import Settings from "../pages/Admin/Settings";
import Buttons from "../pages/Admin/Buttons";
import Cards from "../pages/Admin/Cards";
import Table from "../pages/Admin/Table";
import FormInputs from "../pages/Admin/FormInputs";
import Texts from "../pages/Admin/Texts";
import Modals from "../pages/Admin/Modals";
import Tabs from "../pages/Admin/Tabs";
import Photobooth from "../pages/Main/Photobooth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default landing: kiosk booth */}
        <Route path="/" element={<Navigate to="/booth" replace />} />

        {/* Public kiosk route (outside admin layout) */}
        <Route path="/booth" element={<Photobooth />} />
        <Route path="/photobooth" element={<Navigate to="/booth" replace />} />

        <Route element={<RootLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/table" element={<Table />} />
          <Route path="/form-inputs" element={<FormInputs />} />
          <Route path="/texts" element={<Texts />} />
          <Route path="/modals" element={<Modals />} />
          <Route path="/tabs" element={<Tabs />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/booth" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
