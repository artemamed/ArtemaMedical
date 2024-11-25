import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import image_logo from '@/public/images/Footer/footer_logo.png'
import { Mail, Phone } from 'lucide-react';
import image1 from '@/public/images/Footer/footer1.png'
import image2 from '@/public/images/Footer/footer2.png'
import image3 from '@/public/images/Footer/footer3.png'



export default function Footer() {
  return (
    <footer>
      <div className="bg-[#004040] py-10 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between xl:space-x-[1rem]">
          <div className="w-full md:w-1/3 mb-6 text-center md:text-left xl:-ml-[5rem] xl:mr-[5rem] md:pl-2">
            <Image src={image_logo} alt='Logo' />
            <p className="text-gray-300 text-sm md:text-lg">
              371 J, Commercial Block EME Society DHA Phase XII Canal Road, Lahore, Pakistan.
            </p>
            <div className="flex w-full mt-[3rem] items-center">
              <div className="flex items-center gap-4">
                <Image src={image1} alt="image1" className="h-32" />
                <Image src={image2} alt="image2" className="h-[4rem]" />
                <Image src={image3} alt="image3" className="h-[4rem]" />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/6 mb-6 text-center md:text-left">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="text-gray-300 space-y-2">
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/">Home</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/about">About Us</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/contact">Contact Us</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/contact">Our Distributors</Link></li>
            </ul>
          </div>

          {/* Expertise Links */}
          <div className="w-full md:w-1/6 mb-6 text-center md:text-left">
            <h4 className="text-lg font-semibold">Our Expertise</h4>
            <ul className="text-gray-300 space-y-2">
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/terms-and-conditions">Surgical Instruments</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/shipping-policy">Biomedical Equipment</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/refund-policy">Health Tech</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="w-full md:w-1/6 mb-6 text-center md:text-left">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="text-gray-300 space-y-2">
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/terms-and-conditions">FAQ&apos;s</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/shipping-policy">IFU</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/refund-policy">Blog</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full md:w-1/6 mb-6 text-center md:text-left">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="text-gray-300 space-y-2">
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/shipping-policy">Privacy Policy</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/refund-policy">Refund Policy</Link></li>
              <li className="hover:text-green-400 transition duration-300 cursor-pointer"><Link href="/refund-policy">Shipping Policy</Link></li>
            </ul>
            <div className="flex space-x-6 mt-[4rem]">
              <FaFacebook size={24} className="cursor-pointer hover:text-green-400 transition-colors" />
              <FaTwitter size={24} className="cursor-pointer hover:text-green-400 transition-colors" />
              <FaInstagram size={24} className="cursor-pointer hover:text-green-400 transition-colors" />
              <FaLinkedin size={24} className="cursor-pointer hover:text-green-400 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#CFE7E7] p-2 flex items-center justify-evenly">
        <p className="text-sm">
          Copyright © 2024 Arthema tech Inc. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          <Mail />
          <span>artemamed@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone />
          <span>+1 (210) 468-7779</span>
        </div>
      </div>
    </footer>
  );
}
