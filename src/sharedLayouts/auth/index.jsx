import React, { useEffect } from "react";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE } from "../../constants";
import { userLoginRequest } from "../../redux/slicers/user";
function AuthSharedLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector(({ user }) => user?.isAuthenticated);
  const deviceToken = useSelector(({ user }) => user.deviceToken);

  console.log({ deviceToken, authenticated });

  useEffect(() => {
    if (authenticated) {
      navigate(DASHBOARD_ROUTE);
    } else if (!authenticated) {
      dispatch(
        userLoginRequest({
          payloadData: {
            email: "test@viabletree.com",
            password: "test12345",
            token: deviceToken,
          },
          responseCallback: (status, res) => {
            if (status) {
            }
          },
        })
      );
    }
  }, [authenticated, deviceToken]);

  return (
    <section className="auth-wrapper">
      <Header />
      {children}
    </section>
  );
}

export default AuthSharedLayout;
