import "./globals.css";

export const metadata = {
  title: "IDDEAS | Home",
  description: "Iddeas pvt ltd's page for starting up",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
