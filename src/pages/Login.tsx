import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "@/redux/api/userAPI";
import { useToast } from "@/hooks/use-toast";

const genderOptions = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { toast } = useToast()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.dateOfBirth!=='' &&formData.gender!==''&&formData.email!=='' &&formData.firstName!=='' &&formData.lastName!=='' &&formData.password!==''){
      toast({
        title: "Account Created Successfully!",
        description: "Now login through Google",
      });
    }
    else{
      toast({
        variant: "destructive",
        title: "Please fill all the fields",
        description: "Please fill all the fields",
      });
    }
  };




  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    await login({
      _id: user.uid,
      name: user.displayName!,
      email: user.email!,
      photo: user.photoURL!,
      role: "user",
      gender: formData.gender,
      dob: formData.dateOfBirth,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
         toast({
            title: "Account Created Successfully!",
            description: "Login Success",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
         
        }
      });
  };

  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear() - 120, 0, 1)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className=" flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-900 border bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm text-white font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm text-white font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-white font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-white font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-2 text-blue-300 hover:text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm text-white font-medium"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm text-white font-medium"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              min={minDate}
              max={maxDate}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center bg-gray-950 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                className="mr-2"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
