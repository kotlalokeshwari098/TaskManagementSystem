import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            const token = response.data.token;

            login(token);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div>
                    <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Please sign in to access your dashboard
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg p-3 text-center font-medium">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline transition-colors"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;