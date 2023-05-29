import React, { useState } from "react";
import { Header, Footer } from "../../components";

function PublicSharedLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}

export default PublicSharedLayout;
