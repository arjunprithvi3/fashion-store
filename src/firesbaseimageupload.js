import React, { useState } from "react";
import { imagedb } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() { 
    const [img, setImg] = useState('');
    const handleClick = () => {
        const imgRef = ref(imagedb, `files/${v4()}`);
        uploadBytes(imgRef, img);
    }
    return (
        <div className="App">
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <button onClick={handleClick}>Upload</button>
        </div>
    );
}

export default FirebaseImageUpload; 
