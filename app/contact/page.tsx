import { Button } from '@/components/ui/button'
import LayoutWrapper from '@/components/Wrapper/LayoutWrapper'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const contact = () => {
  return (
    <LayoutWrapper>
      <div className="min-h-screen py-12">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-[#004040]">Contact Us</h2>
          <p className="mt-2 text-gray-500">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        <div className="flex items-center justify-center py-16">
          {/* Main Container */}
          <div className="bg-white shadow-xl rounded-xl flex flex-col lg:flex-row p-2 lg:h-[600px] lg:w-[1196px] w-full max-w-[100%]">
            {/* Left Section */}
            <div className="bg-[#004040] text-white p-8 w-full lg:w-[491px] rounded-2xl">
              <h2 className="md:text-2xl font-bold">Contact Information</h2>
              <p className="mt-2 text-[#C9C9C9]">Say something to start chat!</p>
              <ul className="mt-16 space-y-8 text-sm lg:mt-[6rem]">
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  +1 (210) 468-7779
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  artemamed@gmail.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-8 h-8 md:w-5 md:h-5 mr-3" />
                  7901 4th St. N STE 10963, Saint Petersburg, Florida, 3370
                </li>
              </ul>
              <Image
                src="/assets/contact_assets1.png"
                alt="Contact Image"
                width={200}
                height={200}
                className="hidden lg:block absolute mt-16 mix-blend-lighten ml-[14rem] rounded-lg"
              />
            </div>

            {/* Right Section (Form) */}
            <div className="px-8 py-2 md:py-8 w-full lg:w-2/3">
              <form className="space-y-6 md:space-y-12 mt-4">
                {/* Name Fields */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                {/* Email and Phone Fields */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+1 012 3456 789"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#666666]">
                    Select Subject
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="general1"
                        name="subject"
                        className="radio mr-2 appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-teal-700 checked:border-teal-700 relative"
                      />
                      <label htmlFor="general1" className="text-sm">General Inquiry</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="general2"
                        name="subject"
                        className="radio mr-2 appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-teal-700 checked:border-teal-700 relative"
                      />
                      <label htmlFor="general2" className="text-sm">Feedback</label>
                    </div>
                  </div>
                </div>



                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#666666]">Message</label>
                  <textarea
                    rows={1}
                    placeholder="Write Your Message..."
                    className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center sm:justify-end ">
                  <Button type="submit" className="text-sm md:text-base py-2 md:py-3 ">
                    Send Message
                  </Button>
                </div>
              </form>
              <Image
                src="/assets/contact_assets2.png"
                alt="Contact Image"
                width={200}
                height={200}
                className="hidden lg:block absolute lg:ml-[13rem] xl:ml-[23rem] -mt-[1.75rem]"
              />
            </div>
          </div>
        </div>

        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.9539465572534!2d74.20539527582142!3d31.442934774249576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff4ff98c2f9f%3A0x3b0ba373f6f14701!2sArtema%20Medical%20Group!5e0!3m2!1sen!2s!4v1733458838646!5m2!1sen!2s"
          width="100%"
          className="rounded-lg shadow-md h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mx-auto"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>
    </LayoutWrapper>
  )
}

export default contact
