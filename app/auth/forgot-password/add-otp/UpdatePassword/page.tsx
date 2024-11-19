"use client";
import React from "react";

const Page = (props: { params: { email: string } }) => {
  const email: string = props.params.email;
  console.log(email);
  type IUpdateForm = {
    new_password: string;
    again_Password: string;
  };
  // state where we store out IUpdateForm form inputs
  const [input, setinput] = React.useState<IUpdateForm>({
    new_password: "",
    again_Password: "",
  });
  // its help the user to write something in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <>
      <div className=" flex  flex-col items-center justify-center lg:justify-normal px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-4xl ">
              Write Your New Password
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={input.new_password}
                  autoComplete={"true"}
                  onChange={handleChange}
                  name="new_password"
                  id="new_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="again_Password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={input.again_Password}
                  autoComplete={"true"}
                  onChange={handleChange}
                  name="again_Password"
                  id="again_Password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
                  required={true}
                />
              </div>
              <button
                // onClick={handleSubmit}
                type="button"
                className="w-full text-white bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
