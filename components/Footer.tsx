import Link from 'next/link';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-10 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between xl:space-x-[1rem]">
        <div className="w-full md:w-1/3 mb-6 text-center md:text-left xl:-ml-[5rem] xl:mr-[5rem] md:pl-2">
          <h3 className="text-xl md:text-3xl font-semibold">
            Win<span className="text-green-400">Corn Medical</span>
          </h3>
          <p className="text-gray-300 mt-2 text-sm md:text-lg">
          Wincorn Medical provides surgical products and services to everyone worldwide, ensuring safety, precision, and quality.
          </p>
        </div>

        <div className="w-full md:w-1/6 mb-6 text-center md:text-left">
          <h4 className="text-lg md:text-xl font-bold">About Us</h4>
          <ul className="text-gray-300 space-y-2">
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/">Home</Link></li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/about">About Us</Link></li>
            {/* <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/blogs">Our Blog</Link></li> */}
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="w-full md:w-1/6 mb-6 text-center md:text-left">
          <h4 className="text-lg md:text-xl font-bold">Policies</h4>
          <ul className="text-gray-300 space-y-2">
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/terms-and-conditions">Terms & Condition</Link></li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/shipping-policy">Shipping Policy</Link></li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/refund-policy">Refund Policy</Link></li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/cookie-policy">Cookies Policy</Link></li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6 text-center md:text-left">
          <h4 className="text-lg md:text-xl font-bold">Contact Us</h4>
          <p className="flex items-center justify-center md:justify-start text-gray-300 mt-2">
            <FaMapMarkerAlt className="mr-2 h-8 w-8" /> 100 N Central Expy Suite 1310 Chase Bank Building Richardson, TX 75080, KGW Law
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-300 mt-2">
            <FaEnvelope className="mr-2" /> info@kgwlawfirm.com
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-300 mt-2">
            <FaPhone className="mr-2" /> +1 214-630-1221
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <h4 className="text-xl font-bold">Follow Us</h4>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-600 transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-600 transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-700 transition duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
