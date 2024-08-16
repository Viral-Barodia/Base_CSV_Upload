import { useState } from 'react'
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import DashboardComponent from '../DashboardComponent/DashboardComponent';

const ParentComponent = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle('dark');
    };

  return (
    <>
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            <SidebarComponent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className="flex-1">
              <DashboardComponent isDarkMode={isDarkMode} />
            </div>
        </div>
    </>
  )
}

export default ParentComponent