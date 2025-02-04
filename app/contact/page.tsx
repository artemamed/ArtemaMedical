"use client";

import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isAcceptTerms, setIsAcceptTerms] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedSubject, setSelectedSubject] = useState<string>("General Inquiry");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        subject: selectedSubject,
        termsAccepted: isAcceptTerms,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Your message has been sent successfully!", {
        position: "top-right",
      });

      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsAcceptTerms(false);
      setSelectedSubject("General Inquiry");
    } else {
      toast.error(`Error: ${data.error}`, { position: "top-right" });
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle subject selection
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <LayoutWrapper>
      {/* Toast notifications */}
      <ToastContainer />

      <div className="min-h-screen py-12">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#004040]">Contact Us</h1>
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
                  042 32361469
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  sales@artemamed.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-8 h-8 md:w-5 md:h-5 mr-3" />
                  371-J Commercial, 371-J DHA EME Sector, Lahore, 53710
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

            {/* Right Section */}
            <div className="px-8 py-2 md:py-8 w-full lg:w-2/3">
              <form className="space-y-6 md:space-y-9 mt-4" onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                {/* Email and Phone Fields */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-[#666666]">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                        value="General Inquiry"
                        checked={selectedSubject === "General Inquiry"}
                        onChange={handleSubjectChange}
                        className="radio mr-2 appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-teal-700 checked:border-teal-700 relative"
                      />
                      <label htmlFor="general1" className="text-sm">
                        General Inquiry
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="feedback"
                        name="subject"
                        value="Feedback"
                        checked={selectedSubject === "Feedback"}
                        onChange={handleSubjectChange}
                        className="radio mr-2 appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-teal-700 checked:border-teal-700 relative"
                      />
                      <label htmlFor="feedback" className="text-sm">
                        Feedback
                      </label>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#666666]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={1}
                    placeholder="Write Your Message..."
                    className="mt-1 w-full border-b focus:outline-none focus:ring-0"
                  ></textarea>
                </div>

                {/* Terms Checkbox */}
                <div className="flex-1 items-center mb-4 flex-wrap sm:flex-nowrap">
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    checked={isAcceptTerms}
                    onChange={() => setIsAcceptTerms(!isAcceptTerms)}
                    className="radio mr-2 h-4 w-4 appearance-none border border-black rounded-full checked:bg-teal-700 checked:border-teal-700 relative"
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className="text-xs sm:text-sm text-gray-600"
                  >
                    I agree that my personal information is used in accordance with the{" "}
                    <Link href="/privacy-policy" className="font-semibold text-teal-800">
                      Privacy
                    </Link>{" "}
                    and{" "}
                    <Link href="/cookie-policy" className="font-semibold text-teal-800">
                      Cookie Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div
                  className={`flex justify-center sm:justify-end ${!isAcceptTerms ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  <Button type="submit" className="text-sm md:text-base py-2 md:py-3" disabled={!isAcceptTerms}>
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
          // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.879364710834!2d-82.64314161629683!3d27.844245514491146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e6a2b7855c1f%3A0x4e3e0f613f7708f7!2s7901%204th%20St%20N%2C%20St.%20Petersburg%2C%20FL%2033702%2C%20USA!5e0!3m2!1sen!2s!4v1734932587848!5m2!1sen!2s"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13615.815782487447!2d74.1889157871582!3d31.442934800000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff4ff98c2f9f%3A0x3b0ba373f6f14701!2sArtema%20Medical%20Group!5e0!3m2!1sen!2s!4v1738668454880!5m2!1sen!2s"
          width="100%"
          className="rounded-lg shadow-md h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mx-auto"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </LayoutWrapper>
  );
};

export default Contact;
