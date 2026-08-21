import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

function Navbar() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}

                <div
                    className="cursor-pointer text-xl font-bold tracking-tight text-slate-900 dark:text-white"
                    onClick={() => navigate("/dashboard")}
                >
                    TaskFlow
                </div>


                {/* Right side */}

                <div className="flex items-center gap-4">

                    <ThemeToggle />

                    <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                        Task Manager
                    </span>

                    <button
                        onClick={handleLogout}
                        className="
                            rounded-lg
                            border
                            border-slate-200
                            dark:border-slate-700
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-slate-700
                            dark:text-slate-200
                            transition
                            hover:bg-slate-100
                            dark:hover:bg-slate-800
                            cursor-pointer
                        "
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;