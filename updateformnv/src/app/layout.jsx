import "./globals.css";

export const metadata = {
  title: "Nutan Vidiyalaya | Info Update",
  description: "Application ",
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
