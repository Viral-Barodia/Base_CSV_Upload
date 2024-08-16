import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { FaGithub, FaApple, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
import './LoginComponent.scss';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

const LoginComponent: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignInButtonClick = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Can only login using Google",
      showConfirmButton: false,
      timer: 5000
    });
  }

  const handleGoogleLoginSuccess = (response: any) => {
    setError(null);
    const decodedToken: any = jwtDecode(response.credential);
    const profilePicture = decodedToken?.picture;
    if (profilePicture) {
        localStorage.setItem('profilePicture', profilePicture);
    }

    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };


  const handleGoogleLoginFailure = () => {
    setError('Login failed. Please try again.');
  };
  const [error, setError] = useState<string | null>(null);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className={`flex flex-col md:flex-row py-2 px-2 h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
        {/* Left Section */}
        <div className="outer-left flex-1 flex items-center justify-center bg-blue-600 p-10 rounded-lg md:flex hidden">
          <div className="inner-left relative w-full max-w-2xl h-[95%] text-white rounded-md p-10 flex flex-col justify-between">
            <div>
              <div className="company-logo flex items-center w-36 bg-white rounded-full px-4 py-2 mb-6">
                <img src="./Logo.png" alt="company-logo-icon" className="w-8 h-8 mr-2" />
                <h1 className="text-3xl font-bold font-montserrat text-black">Base</h1>
              </div>
              <p className="text-2xl w-full font-bold ps-2 mb-6">
                Generate detailed reports with just one click
              </p>
            </div>

            <div className="absolute bottom-0 right-0 w-full max-w-xs">
              <img
                src="https://s3-alpha-sig.figma.com/img/ecc4/49ea/6b53db2801f7197a6cf3c0f494d01327?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZA9twYUc2wPGP9tfDq9k5-lE-H1Ixkzvhkbya3FxNr15HROvPsxtgcqTFVhK~4tGN96IGe0ZMeBjYgXEo1ec~zxawwmJdQJ0v5GljCbWMoeCkMVnRjkzx3eECL5NGbWQQtlCEJ8rMb9BOXFefojGyHE75~pJG3hcR9MlFMsUiT-PtjR-WrvtrLjlaeu1JPMHef55cnmbUWUzbW5xEVnjh3gvcBzeFjeMnCDzlxH-2uc45g9i3CJ5kUMdiy8b8XqdFTR9UGwidedANy5AxIFeSpTziDi6rkuinwDgd4GP6t108R60ml1fLPfGOZskFJRlMSCviFnHUI14DETJg~Z9CA__"
                alt="Person with camera"
                className="person-image w-full max-w-xs"
              />
            </div>

            <div className="absolute bottom-10 left-14">
              <button
                className="p-2 bg-white text-gray-800 rounded-full"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={`flex-1 flex flex-col justify-center p-10 md:p-10`}>
          <div className="w-full max-w-md mx-auto">
            <h2 className={`font-montserrat text-2xl font-semibold mb-6 text-gray-800 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Sign In</h2>
            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-8 font-lato ${isDarkMode ? 'text-white' : 'text-dark'}`}>Sign in to your account</p>
            <div className="flex space-x-4 mb-6">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />
              <button className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg">
                <FaApple className="mr-2" />
                Sign in with Apple
              </button>
            </div>
            {error && (
                <div className="text-red-600 dark:text-red-400 mt-4">
                {error}
                </div>
            )}
            <form>
              <div className="mb-4">
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Email address</label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                onClick={handleSignInButtonClick}
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </form>
            <p className={`mt-6 text-center text-sm text-gray-600 dark:text-gray-400 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
              Don’t have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Register here
              </a>
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-8 text-gray-500 dark:text-gray-400">
            <FaGithub className="h-5 w-5 cursor-pointer" />
            <FaTwitter className="h-5 w-5 cursor-pointer" />
            <FaLinkedin className="h-5 w-5 cursor-pointer" />
            <FaDiscord className="h-5 w-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginComponent;
