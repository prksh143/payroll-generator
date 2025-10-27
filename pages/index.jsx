import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hasErroredOnce, setHasErroredOnce] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();

  const handleLogin = () => {
    setError(false);
    setLoading(true); // Start loading

    setTimeout(() => {
      if (!hasErroredOnce) {
        if (
          username.toLowerCase() === "shrikantkumar4565" &&
          password.toLowerCase() === "$Shrikant@123"
        ) {
          router.push("/payroll-generator");
        } else {
          setError(true);
          // setHasErroredOnce(true);
        }
      } else {
        router.push("/payroll-generator");
      }

      setLoading(false); // End loading
    }, 2000); // Fake loading for 2 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e9eef9] p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={100} // adjust size as needed
            height={100}
            className="mb-4"
          />
          <h2 className="text-xl font-semibold">Employee & Manager</h2>
          <p className="text-sm text-gray-500">Self service</p>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          className={`w-full py-2 rounded font-semibold transition-all duration-200 shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Logging in...
            </div>
          ) : (
            "Login"
          )}
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">
            Invalid credentials. Please try again.
          </div>
        )}

        <div className="flex justify-between text-sm text-blue-600 mt-4">
          <a href="#">Forgot Password</a>
          <a href="#">Sign Up</a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <div className="text-4xl font-extrabold text-blue-700 tracking-wide mb-1 font-sans">
          ePayroll Connect
        </div>
        <p className="text-xs max-w-md mx-auto">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-600 underline">
            Terms of Service
          </a>
          . Please review our{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Statements
          </a>{" "}
          to understand how we collect, use, and protect your personal
          information.
        </p>
      </div>
    </div>
  );
}
