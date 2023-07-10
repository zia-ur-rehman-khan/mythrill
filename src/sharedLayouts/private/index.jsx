import React, { useEffect } from 'react';
import { Header, Layout } from '../../components';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PREMIUM_SUBSCRIPTION_ROUTE, lOGIN_ROUTE } from '../../constants';
import PremiumSubscription from '../../modules/private/premiumSubscription';

function PrivateSharedLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const authenticated = useSelector(({ user }) => user.isAuthenticated);

  useEffect(() => {
    if (!authenticated) {
      navigate(lOGIN_ROUTE);
    }
  }, [authenticated]);

  return (
    <section>
      {location.pathname === PREMIUM_SUBSCRIPTION_ROUTE ? (
        <PremiumSubscription />
      ) : (
        <Layout>{children}</Layout>
      )}
    </section>
  );
}

export default PrivateSharedLayout;
