import { useState } from "react";
import { FiMenu } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

interface SidebarProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({ isDarkMode, toggleDarkMode }) => {
    const allTabs = ['Dashboard', 'Upload', 'Invoice', 'Schedule', 'Calendar', 'Notification', 'Settings'];
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('Upload');
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className={`flex flex-col transition-width duration-300 ${isSidebarOpen ? 'w-64' : 'w-24'} ${isDarkMode ? 'bg-black text-white' : 'bg-white text-[#6E6E6E]'}`}>
                <div className="flex items-center justify-between p-4">
                    <div className="text-lg font-semibold">
                        {isSidebarOpen ? (
                            <div className="flex items-center">
                                <img src="../../../Logo.png" style={{ height: '20px', width: '20px' }} alt="Logo" />
                                Base
                            </div>
                        ) : (
                            <img src="../../../Logo.png" style={{ height: '20px', width: '20px' }} alt="Logo" />
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-700"
                    >
                        <FiMenu className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-[#6E6E6E]'}`} />
                    </button>
                </div>
                <nav className="flex-1">
                    <ul className="space-y-4 p-4">
                        {allTabs.map((tab) => (
                            <li key={tab}>
                                <a
                                    href="#"
                                    className={`font-nunito flex items-center space-x-4 p-2 rounded-md hover:bg-gray-700 ${
                                        activeTab === tab ? 'text-[#605BFF]' : `${isDarkMode ? 'text-white' : 'text-[#6E6E6E]'}`
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} w-9 p-2 text-gray-400 rounded-md hover:bg-gray-600`}
                    >
                        {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5 text-[#6E6E6E]" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarComponent;
