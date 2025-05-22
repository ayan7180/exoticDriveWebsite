import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-black font-bold text-xl">
        <footer>
          <ul className="container mx-auto px-4 flex justify-center space-x-4 py-6 text-red-600">
            <Link to="/">
                Home
            </Link>
            <Link to="/brands">
                Our Brands
            </Link>
            <Link to="/catalog">
                Catalog
            </Link>
            <Link to="/service">
                Service
            </Link>
            <Link to="/about">
                About
            </Link>
          </ul>
          <p className="text-center">&copy; 2024 Exotic Drive, Inc</p>
          <p className="text-center"> Note: This is NOT a real company</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
