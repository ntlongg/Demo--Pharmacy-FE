import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../component/Input";
import { Lock } from "lucide-react";
import { toast } from 'react-toastify';
import SummaryApi from "../common";
import FloatingShape from "../component/FloatingShape";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            try {
                const response = await fetch(SummaryApi.resetPassword.url, {
                    method: SummaryApi.resetPassword.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password })
                });

                const responseData = await response.json();

                if (responseData && responseData.success) {
                    toast.success(responseData.message);
                    navigate("/login");
                } else {
                    toast.error(responseData.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while resetting password");
            }
        } else {
            toast.error("Mật khẩu không trùng khớp");
            console.log("Passwords do not match");
        }
    };

    return (
        <div className="mx-auto container pt-2 bg-black min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Confirm New Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                    >
                        Set New Password
                    </motion.button>
                </form>
            </div>
        </motion.div>
        </div>
    );
};

export default ResetPasswordPage;