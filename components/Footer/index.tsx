import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Mail, Phone } from 'lucide-react';
import image_logo from '@/public/images/Footer/footer_logo.png';
import image1 from '@/public/images/Footer/footer1.png';
import image2 from '@/public/images/Footer/footer2.png';
import image3 from '@/public/images/Footer/footer3.png';

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#004040] py-6 sm:py-8 md:py-10 text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src={image_logo}
                alt='Logo'
                className="w-auto h-auto max-w-[160px]"
              />
              <p className="text-gray-300 text-sm md:text-base mt-4 text-center md:text-left">
              371-J Commercial, 371-J DHA EME Sector, Lahore, 53710
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <Image src={image1} alt="image1" className="h-24 w-auto object-contain" />
                <Image src={image2} alt="image2" className="h-12 mt-6 w-auto object-contain" />
                <Image src={image3} alt="image3" className="h-12 w-auto object-contain md:ml-4 md:mt-6 lg:-mt-[5.5rem] lg:ml-[12rem]" />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="text-gray-300 space-y-2 text-center md:text-left">
              <li><Link href="/" className="hover:text-green-400 transition duration-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-green-400 transition duration-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition duration-300">Contact Us</Link></li>
              <li><Link href="/distributors" className="hover:text-green-400 transition duration-300">Our Distributors</Link></li>
            </ul>
          </div>

          {/* Expertise Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Our Expertise</h4>
            <ul className="text-gray-300 space-y-2 text-center md:text-left">
              <li><Link href="/category" className="hover:text-green-400 transition duration-300">Surgical Instruments</Link></li>
              <li><Link href="/biomedical" className="hover:text-green-400 transition duration-300">Biomedical Equipment</Link></li>
              <li><Link href="https://artematech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition duration-300">Health Tech</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="text-gray-300 space-y-2 text-center md:text-left">
              <li><Link href="/faqs" className="hover:text-green-400 transition duration-300">FAQ&apos;s</Link></li>
              <li><Link href="/ifu" className="hover:text-green-400 transition duration-300">IFU</Link></li>
              <li><Link href="/blog" className="hover:text-green-400 transition duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="text-gray-300 space-y-2 text-center md:text-left">
              <li><Link href="/terms" className="hover:text-green-400 transition duration-300">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-green-400 transition duration-300">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-green-400 transition duration-300">Refund Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-green-400 transition duration-300">Shipping Policy</Link></li>
            </ul>
            <div className="flex gap-4 mt-6 lg:mt-[4rem] lg:gap-6">
              <Link href="https://www.facebook.com/profile.php?id=61556179106203" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6 cursor-pointer hover:text-green-400 transition-colors" />
              </Link>
              <Link href="https://www.instagram.com/surgical.medical.instruments/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-6 h-6 cursor-pointer hover:text-green-400 transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/company/artema-medical-group/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-green-400 transition-colors" />
              </Link>
              <Link href="https://www.youtube.com/@ArtemaMedical" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="w-6 h-6 cursor-pointer hover:text-green-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#CFE7E7] p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-center sm:text-left">
            Copyright © 2024 Artema Medical LLC. All rights reserved.
          </p>
          <p className="text-center sm:text-left">
            Powered by Artema Tech
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>sales@artemamed.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>042-32361469</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}