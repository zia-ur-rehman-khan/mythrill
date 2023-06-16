import React, { useEffect } from 'react';
import { Header, Layout } from '../../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lOGIN_ROUTE } from '../../constants';

function PrivateSharedLayout({ children }) {
  const navigate = useNavigate();
  const authenticated = useSelector(({ user }) => user.isAuthenticated);

  useEffect(() => {
    if (!authenticated) {
      navigate(lOGIN_ROUTE);
    }
  }, [authenticated]);

  return (
    <section>
      <Layout>{children}</Layout>
    </section>
  );
}

export default PrivateSharedLayout;
