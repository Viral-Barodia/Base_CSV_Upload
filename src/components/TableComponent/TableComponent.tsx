import React, { useState } from 'react';

interface UploadedFile {
  name: string;
  size: number;
}

interface TableProps {
  isDarkMode: boolean;
  uploadedFiles: UploadedFile[];
}

const headers = ['SI No.', 'Links', 'Prefix', 'Add Tags', 'Selected Tags'];
const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'];

const TableComponent: React.FC<TableProps> = ({ uploadedFiles }) => {
  const [selectedTags, setSelectedTags] = useState<{ [key: number]: string[] }>({});
  const [popoverIndex, setPopoverIndex] = useState<number | null>(null);

  const handleAddTag = (index: number, tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev[index] ? [...prev[index], tag] : [tag];
      return { ...prev, [index]: newTags };
    });
    setPopoverIndex(null);
  };

  const handleRemoveTag = (index: number, tagToRemove: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [index]: prev[index].filter(tag => tag !== tagToRemove),
    }));
  };

  return (
    <div className="font-figtree">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Uploads</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-black rounded-md shadow overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="p-4 text-left text-gray-800 dark:text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow m-4"
              >
                <td className="p-4 text-gray-800 dark:text-white">
                  {String(index + 1).padStart(2, '0')}
                </td>
                <td className="p-4 text-blue-600 dark:text-blue-400">
                  <a href={`https://${file.name}`} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </td>
                <td className="p-4 text-gray-800 dark:text-white">prefixsample</td>
                <td className="p-4 text-gray-800 dark:text-white">
                  <div className="relative">
                    <button
                      onClick={() => setPopoverIndex(popoverIndex === index ? null : index)}
                      className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white p-2 rounded-md w-full text-left"
                    >
                      Select Tags
                    </button>
                    {popoverIndex === index && (
                      <div className="fixed top-50 z-50 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md">
                        {tags.map(tag => (
                          <div
                            key={tag}
                            onClick={() => handleAddTag(index, tag)}
                            className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4 text-gray-800 dark:text-white">
                  <div className="flex flex-wrap gap-2">
                    {selectedTags[index]?.map(tag => (
                      <div key={tag} className="flex items-center bg-[#605BFF] text-white rounded-md px-3 py-1">
                        <span className="text-sm">{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(index, tag)}
                          className="ml-2 text-xs text-white"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
