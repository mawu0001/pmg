import "./globals.css";
import Navbar from "./components/navigation";
import Footer from "./components/footer";

export const metadata = {
  title: "PMG previewer",
  robots: {
    index: false,
    follow: false,
  },
  description: "Generated by UXpressen",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mt-4">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
