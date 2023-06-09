import React, { useEffect } from "react";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "../../constants";
import { userLoginRequest } from "../../redux/slicers/user";
function AuthSharedLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sss = useSelector(({ user }) => user?.text);
  const token = useSelector(({ user }) => user?.deviceToken);
  const isAuthenticated = useSelector(({ user }) => user?.isAuthenticated);
  const user = useSelector(({ user }) => user);

  console.log({ user });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_ROUTE);
    } else {
      dispatch(
        userLoginRequest({
          payloadData: {
            email: "test@viabletree.com",
            password: "test12345",
            platform: "android",
            token: token,
          },
        })
      );
    }
  }, [isAuthenticated, token]);

  return (
    <section className="auth-wrapper">
      <Header />
      {children}
    </section>
  );
}

export default AuthSharedLayout;
