import { useEffect, useState } from "react";
import { getCurrentUser, loginWithGoogle, logoutUser } from "../services/authService";

interface GoogleUser {
    displayName: string;
    photos?: { value: string }[];
    emails?: { value: string }[];
}

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [user, setUser] = useState<GoogleUser | null>(null);

    useEffect(() => {
    const checkUser = async () => {
        try {
            const response = await getCurrentUser();

            console.log("Current user response:", response);

            setUser(response.user);
        } catch (error) {
            console.error("Failed to fetch current user:", error);
            setUser(null);
        }
    };

    checkUser();
}, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;
        console.log("Searching for:", searchQuery);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md text-black dark:bg-[#0f0f0f] dark:text-white">

            <div className="flex items-center gap-5">
                <button onClick={onMenuClick} className="text-2xl font-bold">☰</button>

                <div className="flex items-center gap-1">
                    <span className="rounded-lg bg-red-600 px-2 py-1 text-white">▶</span>
                    <span className="text-lg font-bold">YouTube</span>
                </div>
            </div>

            <form onSubmit={handleSearch} className="mx-4 hidden max-w-2xl items-center sm:flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="h-10 w-full rounded border border-gray-300 bg-transparent px-5 outline-none focus:border-blue-500 dark:border-gray-700"
                />

                <button type="submit" className="h-10 rounded-r-full border border-gray-300 bg-gray-100 px-6 dark:border-gray-700 dark:bg-[#222222]">
                    🔍
                </button>

                <button type="button" className="ml-4 h-10 w-10 rounded-full bg-gray-100 dark:bg-[#222222]">
                    🎙️
                </button>
            </form>

            <div className="flex items-center gap-4">
                <button className="hidden sm:block">+ Create</button>
                <button className="text-xl">🔔</button>

                {user ? (
                    <div className="flex items-center gap-2">
                        {user.photos?.[0]?.value ? (
                            <img
                                src={user.photos[0].value}
                                alt="Profile"
                                className="h-8 w-8 rounded-full"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
                                {user.displayName.charAt(0)}
                            </div>
                        )}

                        <button onClick={handleLogout} className="text-sm">
                            Sign out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={loginWithGoogle}
                        className="rounded-full border border-blue-600 px-4 py-2 text-sm text-blue-600"
                    >
                        Sign in
                    </button>
                )}
            </div>
        </nav>
    );
}