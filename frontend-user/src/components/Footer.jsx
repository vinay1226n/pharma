const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src="/pharma_logo.png"
            alt="Cladian Pharma"
            className="h-12 mb-4"
          />

          <p className="text-sm opacity-90">Trusted Healthcare Solutions</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-secondary transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-secondary transition">
                About
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-secondary transition">
                Products
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-secondary transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Location</h3>
          <p className="text-sm space-y-2 mb-2">
            <span>H.No.5-4-1676/NR, First Floor Opposite ITC, </span>
            <span>BPL Godwon, Near Sushma Theatre, Vanasthalipuram.</span>
          </p>
          <h3 className="font-bold text-lg mb-4">Contact Info</h3>
          <p className="text-sm space-y-2 mb-2">
            <span class="">Email: www.cladianpharma@gmail.com</span>
            <br/><span>Phone: +91 7702108616, 9885108616</span><br/>
            <span>&copy; 2026 Cladian Pharma. All rights reserved.</span>
          </p>
          
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
