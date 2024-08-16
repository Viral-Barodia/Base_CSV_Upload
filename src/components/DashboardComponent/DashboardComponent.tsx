import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import TableComponent from '../TableComponent/TableComponent';
import { FiBell, FiUpload } from 'react-icons/fi';

interface DashboardProps {
  isDarkMode: boolean;
}

interface UploadedFile {
  name: string;
  size: number;
}

const DashboardComponent: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const profilePicture = localStorage.getItem('profilePicture');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).map(file => ({
      name: file.name,
      size: file.size,
    }));
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className={`flex-1 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-figtree font-weight-600 md:font-bold">Upload CSV</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FiBell className="text-gray-800 dark:text-white h-6 w-6" />
            </button>
            <div className="w-10 h-10">
              {profilePicture && <img src={profilePicture} alt="Profile" className="h-10 w-10 rounded-full" />}
            </div>
          </div>
        </div>

        <div className={`flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} items-center justify-start`} style={{ height: 'calc(100vh - 112px)' }}>
          <div className={`flex flex-col items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'} p-6 rounded-lg`} style={{ width: '50%', maxHeight: '250px' }}>
            <div className={`w-full max-w-lg p-10 border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg`}>
              <div className="flex flex-col items-center justify-center">
                <FaFileExcel className="h-10 w-10 text-green-600 mb-4" />
                <p className={`text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drop your excel sheet here or 
                  <label className="text-blue-600 dark:text-blue-400 cursor-pointer">
                    browse
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileUpload} 
                      accept=".csv,.xls,.xlsx" 
                    />
                  </label>
                </p>
              </div>
            </div>
            <div className="w-full max-w-lg mt-4">
              <button
                style={{ background: '#605BFF' }}
                className="bg-blue-600 text-white w-full py-2 rounded-md flex items-center justify-center space-x-2"
                onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
              >
                <FiUpload />
                <span>Upload</span>
              </button>
            </div>
          </div>
            {uploadedFiles.length > 0 && (
              <div className="flex-1 p-6 w-full overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                <TableComponent isDarkMode={isDarkMode} uploadedFiles={uploadedFiles} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
