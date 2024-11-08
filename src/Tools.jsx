import React, { useEffect, useState } from 'react';
import ExportBtn from './components/exportbtn';
import AddBtn from './components/addTextbtn'; 
import Save from './components/saveBtn';

const Tools = ({ handleNameChange, handleMessage, handleColorChange , addTextNode , handleImageUpload}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [colorPairs, setColorPairs] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccess] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        async function fetchColorPairs() {
            const url = `${process.env.PUBLIC_URL}/colors.json`;
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error('error');
                }
                let data = await response.json();
                setColorPairs(data.color_pairs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchColorPairs();
    }, []);

    const handleColorSelect = (colors) => {
        handleColorChange({ target: { value: colors } });
        setIsOpen(false);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
            const imageUrl= URL.createObjectURL(file);
            handleImageUpload(imageUrl);
         }
    }


    return (
        <div className="lg:w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-gray-200">
            <h2 className="text-xl font-bold mb-4">Tools</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-blue-300"
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        rows="6"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-blue-300"
                        onChange={handleMessage}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Choose a file</label>
                    <input
                        type="file"
                        className="mt-1 p-2 block w-1/2 border border-gray-300 rounded-md bg-blue-300"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                 className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded" 
                 onClick={addTextNode}>
                    add text
                </button>
              
                <button
                    id="dropdownDefaultButton"
                    className="w-full text-white bg-blue-700 p-4 font-bold"
                    type="button"
                    onClick={toggleDropdown}
                >
                    Select a color
                </button>
                <div
                    id="dropdown"
                    className={`z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute`}
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {colorPairs.map((pair) => (
                            <li key={pair.name}>
                                <span
                                    onClick={() => handleColorSelect(pair.colors)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {pair.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
              
                <ExportBtn />
               
            </div>
        </div>
    );
};

export default Tools;
