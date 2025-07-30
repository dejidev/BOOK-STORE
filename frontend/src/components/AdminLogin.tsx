import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios"
import getbaseUrl from '../utils/baseurl';


type FormValues = {
    username: string;
    password: string;
};


const AdminLogin = () => {

    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            console.log(data);

            const response = await axios.post(`${getbaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const auth = response.data;
            console.log(auth);

            if (auth.token) {
                localStorage.setItem("token", auth.token);
                setTimeout(() => {
                    localStorage.removeItem("token")
                    alert("Token has expired")
                    navigate("/")
                }, 3600 * 1000);
                setMessage("Login successful!");
                navigate("/dashboard");
            } else {
                setMessage("Login failed: No token received");
            }

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Login failed. Please try again.");
        }
    };



    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-6 text-center">Please log in</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                            {...register("username", { required: "Username is required" })}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.username && (
                            <span className="text-red-500 text-xs">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            {...register("password", { required: "Password is required" })}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs">{errors.password.message}</span>
                        )}
                    </div>


                    {message && <p className="text-green-600 text-sm">{message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-400 hover:bg-blue-500 text-black font-medium py-2 rounded-md transition"
                    >
                        Login
                    </button>
                </form>

                <p className="font-extralight text-xs gray-300 mx-auto flex justify-center m-3">
                    All rights reserved 2099
                </p>
            </div>
        </div>
    );
}

export default AdminLogin
