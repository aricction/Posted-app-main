import React, { useEffect, useState } from 'react';

function AddBtn(){
   
    const [text, setText] = useState([]);

     const handleClick = () => {
          
        setText([...text, 'new text'])
        console.log("clicked add btn");
     }
    
    return (
      
        <div>
            <button id='addbtn' 
             className="w-1/2 text-white rounded hover:bg-blue-700 p-4 font-bold"
             onClick={handleClick}
             >
                Add text 
            </button>
            <div>
                {text.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
    )
}

export default AddBtn;