import React, { PropsWithChildren } from "react";
import Head from "next/head";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>IP Address Tracker</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
