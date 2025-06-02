import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
    email: string;
    password: string;
};

const Login = () => {
    const [message, setMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log("Login data:", data);
        setMessage("Login successful! (Simulated)");
    };

    const handleGoogleLogin = () => {
        console.log("Login with Google clicked");
        setMessage("Google login simulated!");
    };

    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-6 text-center">Please log in</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            {...register("email", { required: "Email is required" })}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
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

                    <div className="font-extralight text-sm flex">
                        <p className="mr-2">Have no account? Please open an account...</p>
                        <Link to="/register" className="text-blue-700">Register</Link>
                    </div>

                    {message && <p className="text-green-600 text-sm">{message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md transition"
                    >
                        Login
                    </button>
                </form>

                <div className="my-6 text-center text-sm text-gray-500">OR</div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                >
                    <FaGoogle className="text-red-600 text-lg" />
                    <span>Login with Google</span>
                </button>

                <p className="font-extralight text-xs gray-300 mx-auto flex justify-center m-3">
                    All rights reserved 2099
                </p>
            </div>
        </div>
    );
};

export default Login;
