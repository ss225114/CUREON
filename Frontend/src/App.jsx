import "./index.css";
import AuthLayout from "./layouts/authLayout";
import GuestLayout from "./layouts/guestLayout";
import { useAuth } from "./modules/Auth/context/authContext";
import AuthAdminRouter from "./router/AuthAdminRouter";
import AuthDoctorRouter from "./router/AuthDoctorRouter";
import AuthUserRouter from "./router/AuthUserRouter";
import GuestRouter from "./router/GuestRouter";

export default function App() {
  const { token } = useAuth();
  return (
    <>
      {token ? (
        <AuthLayout>
          <AuthUserRouter />
          <AuthAdminRouter />
          <AuthDoctorRouter />
        </AuthLayout>
      ) : (
        <GuestLayout>
          <GuestRouter />
        </GuestLayout>
      )}
      {/* <AuthDoctorRouter /> */}
      {/* <AuthAdminRouter /> */}
    </>
  );
}
