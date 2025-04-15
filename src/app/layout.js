import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calculator AI .co",
  description: "Website for AI powered calculators for finance, health, and more",
};

export const calculators = [
  {
    name: "Mortgage Calculator",
    subheading: "Real Estate",
    description: "Calculate your monthly mortgage payments.",
    image: "/images/mortgage-calculator.png",
    link: "/calculators/real-estate/mortgage-calculator",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <NavbarBrand as={Link} href="/">Calculators AI .co</NavbarBrand>
            <Nav className="ms-auto">
              {
                calculators.map((calculator) => (
                  <NavLink
                    key={calculator.name}
                    as={Link}
                    href={calculator.link}
                    className="link-light" // Add hover effect to change color
                  >
                    {calculator.name}
                  </NavLink>
                ))
              }
            </Nav>
          </Container>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
