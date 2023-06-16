import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Error } from '../modules';
import { PAGE_ROUTES, ACCESS_TYPES } from '../constants';
import Helmet from 'react-helmet';
import {
  PrivateSharedLayout,
  AuthSharedLayout,
  PublicSharedLayout
} from '../sharedLayouts';
import { fetchToken } from '../firebase';
import { useSelector } from 'react-redux';

const renderRouteSharedLayout = (title, description, access, component) => (
  <React.Fragment>
    <Helmet>
      <title>
        {title ? `${title} |` : ''} {process.env.REACT_APP_WEB_TITLE}
      </title>
      {description && <meta name="description" content={description} />}
    </Helmet>
    {access === ACCESS_TYPES.AUTH ? (
      <AuthSharedLayout> {component}</AuthSharedLayout>
    ) : access === ACCESS_TYPES.PRIVATE ? (
      <PrivateSharedLayout>{component}</PrivateSharedLayout>
    ) : (
      <PublicSharedLayout>{component}</PublicSharedLayout>
    )}
  </React.Fragment>
);

const PageRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <>
      <Routes>
        {PAGE_ROUTES.map((item, index) => (
          <Route
            path={item.route}
            element={renderRouteSharedLayout(
              item.title,
              item.description,
              item.access,
              item.component
            )}
            key={index}
          />
        ))}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default PageRoutes;
