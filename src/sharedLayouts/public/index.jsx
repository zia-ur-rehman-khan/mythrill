import React, { useState } from "react";
import { Header, Footer, SideBar, Layout } from "../../components";

function PublicSharedLayout({ children }) {
  return (
    <section>
      <Layout>{children}</Layout>
    </section>
  );
}

export default PublicSharedLayout;
