import React, { useState } from "react";
import logosignup from "../assets/image/logosignup.gif";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToabse64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { FiPhoneCall } from "react-icons/fi";
import FloatingShape from "../component/FloatingShape";
import { motion } from "framer-motion";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
    account : ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePic = await imageToBase64(file);
      console.log("imagePic", imagePic);
      setData((prevData) => ({
        ...prevData,
        profilePic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const response = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/verify-email");
      }
      if (responseData.error) {
        toast.error(responseData.message);
      }

      console.log("User", responseData);
    } else {
      toast.error("Mật khẩu không trùng khớp");
      console.log("Passwords do not match");
    }
  };

  return (
    <section id="Signup">
      <div className="container mx-auto pt-2 bg-black min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden ">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="shadow-2xl p-3 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-xl">
            <div>
              <img src={data.profilePic || logosignup} alt="logosignup" />
            </div>
            <form>
              <label>
                <div className="text-sm text-center bg-opacity-50 cursor-pointer py-2 bg-slate-200 absolute bottom-0 w-full">
                  Tải ảnh lên
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div>
              <label>Tên của bạn:</label>
              <div className="flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400 ">
                <input
                  type="text"
                  placeholder="Nhập tên của bạn.."
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r to-emerald-500 text-black bg-clip-text"/>
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400">
                <input
                  type="email"
                  placeholder="Vui lòng nhập Email.."
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r  to-emerald-500 text-black bg-clip-text"
                />
              </div>
            </div>

            <div className="grid">
              <label>Tài khoản:</label>
              <div className="flex items-center w-full max-w-sm focus-within:shadow-ms border rounded-md border-green-400">
                <input
                  type="text"
                  placeholder="Vui lòng nhập Tài khoản.."
                  name="account"
                  value={data.account}
                  onChange={handleOnChange}
                  required
                  className="ml-3 w-80 outline-none pl-50 items-center bg-gradient-to-r  to-emerald-500 text-black bg-clip-text"
                />
              </div>
            </div>

            <div>
              <label>Mật khẩu:</label>
              <div className="flex items-center w-full max-w-sm focus-within:shadow-ms mb-2 border rounded-md border-green-400">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Vui lòng nhập Mật khẩu.."
                  onChange={handleOnChange}
                  required
                  name="password"
                  value={data.password}
                  className="ml-3 w-80 outline-none pl-50 items-center mr-2 bg-gradient-to-r text-black bg-clip-text"
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <IoIosEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Nhập lại mật khẩu:</label>
              <div className="flex items-center w-full max-w-sm focus-within:shadow-ms mb-2 border rounded-md border-green-400">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Vui lòng nhập lại mật khẩu.."
                  onChange={handleOnChange}
                  required
                  name="confirmPassword"
                  value={data.confirmPassword}
                  className="ml-3 w-80 outline-none pl-50 items-center mr-2 bg-gradient-to-r  to-emerald-500 text-black bg-clip-text"
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <IoIosEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-black text-white hover:bg-green-600 hover:text-black px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Đăng ký
              </button>
            </div>
          </form>
          <p className="my-5">
            Quay trở lại đăng nhập?{" "}
            <Link
              to={"/login"}
              className="text-white hover:text-red-700 hover:underline">Đăng nhập
            </Link>
          </p>
          </motion.div>
        <div className="fixed bottom-4 right-1 boder h-16 w-16 rounded-full  bg-lime-400 text-2xl z-30">
          <div className="p-5 text-white hover:scale-150 transition-all object-scale-down hover:text-green-500">
            <FiPhoneCall />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
