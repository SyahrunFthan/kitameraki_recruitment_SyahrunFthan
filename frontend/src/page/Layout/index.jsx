import React, { useEffect, useState } from "react";
import { LoadingPage } from "../../components";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <React.Fragment>
      <main className="flex h-screen w-screen">
        {loading ? <LoadingPage /> : children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
