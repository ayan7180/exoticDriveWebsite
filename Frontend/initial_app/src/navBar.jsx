import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <header>
        <nav className="bg-black font-bold">
          <div className="container mx-auto px-4 flex items-center justify-between py-4 text-red-600">
            <a
              href="index.html"
              className="text-4xl font-bold font-cursive tracking-wide"
            >
              Exotic Drive
            </a>
            <button
              className="lg:hidden text-gray-200 focus:outline-none"
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                menu.classList.toggle("hidden");
              }}
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="hidden lg:flex space-x-6 text-4xl" id="mobile-menu">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/brands" className="hover:text-gray-300">
                Our Brands
              </Link>
              <Link to="/catalog" className="hover:text-gray-300">
                Catalog
              </Link>
              <Link to="/service" className="hover:text-gray-300">
                Service
              </Link>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
              <Link to="/signup" className="text-yellow-600 hover:text-gray-300">
                Sign-Up
              </Link>
            </div>
            
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
