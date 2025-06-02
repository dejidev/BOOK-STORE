import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
};

const Register = () => {
    const [message, setMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit = (data: RegisterForm) => {
        console.log("Registration Data:", data);
        setMessage("Account created! (simulated)");
    };

    const handleGoogleSignUp = () => {
        console.log("Sign up with Google clicked");
        setMessage("Google Sign-Up simulated!");
    };

    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-50">
            <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create an account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            {...register("name", { required: "Name is required" })}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs">{errors.name.message}</span>
                        )}
                    </div>

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

                    {message && <p className="text-green-600 text-sm">{message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md transition"
                    >
                        Register
                    </button>
                </form>

                <div className="my-6 text-center text-sm text-gray-500">OR</div>

                <button
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                >
                    <FaGoogle className="text-red-500 text-lg" />
                    <span>Sign up with Google</span>
                </button>

                <div className="mt-4 font-extralight text-sm flex justify-center">
                    <p className="mr-2">Already have an account?</p>
                    <Link to="/login" className="text-blue-700">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
