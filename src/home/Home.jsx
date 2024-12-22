import React, { useState } from "react";
import Tools from '../Tools';
import Canvas from '../Canvas';
import Navbar from '../components/navbar';
import nike from '../components/images/nike.jpg'

const Home = () => {
    const snippet = `write something...`;

    const [name, setName] = useState('your name');
    const [message, setMessage] = useState(snippet);
    const [color, setColor] = useState('#1e1e1e');
    const [file, setFile] = useState(nike);
    const [text, setText] = useState([]);
    const[imageURL, setImageURL]= useState(null);
    
    

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleColorChange = (e) => {
        setColor(e.target.value);
    }

    const handleFileChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    const handleImageUpload = (url) => {
        setImageURL(url);
    }
    const addTextNode = () => {
        const newText = {
            text: 'New Text',
            x: 20, // Adjust as needed
            y: 150, // Adjust as needed
            fontSize: 16,
            fontFamily: 'monospace',
            fill: color || 'gray',
            width: 200,
            height: 30,
            padding: 12,
            draggable: true,
        };
        setText([...text, newText]);
    }
    const handleImageRemove = () => {
        setFile(null);      // Clear the file image
        setImageURL(null);  // Clear the uploaded image URL
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className="flex flex-col md:flex-row sm:flex-col h-screen w-screen">
                <div className="md:w-1/4 w-full mt-10">
                    <Tools
                        handleNameChange={handleNameChange}
                        handleMessage={handleMessage}
                        handleColorChange={handleColorChange}
                        handleImageUpload={handleImageUpload}
                        handleFileChange={handleFileChange}
                        handleAddText={addTextNode} // Pass function as prop
                        handleImageRemove={handleImageRemove} 
                    />
                </div>
                <div className="md:w-3/4 sm:w-1/2 h-3/4 w-full">
                    <Canvas 
                        name={name} 
                        message={message} 
                        file={imageURL || file}            
                        color={color} 
                        text={text} // Pass textNodes as prop
                        setText={setText} // Pass setTextNodes as prop
                        
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
