import React, { useState } from "react";
import DropboxChooser from 'react-dropbox-chooser';
import axios from 'axios';

const APP_KEY = "l472jjbhsh7g8g0";

export default function App() {
    const [url, setUrl] = useState("");

    function handleSuccess(files) {
        console.log(files[0].link);
        setUrl(files[0].link);
        downloadImage(files[0].link);
    }

    async function downloadImage(link) {
        try {
            const response = await axios.get(link, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const imageUrl = URL.createObjectURL(blob);
            console.log('Image URL:', imageUrl);
            setUrl(imageUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }

    console.log('Current URL:', url);

    return (
        <div className="App">
            <h1 style={{textAlign:"center"}}>Upload or Choose files from Dropbox</h1>
            <br />
            <div style={{textAlign:"center"}} className="container">
                <DropboxChooser appKey={APP_KEY}
                    success={handleSuccess}
                    cancel={() => console.log("closed")}
                    multiselect={false}
                />
                <br /><br />
                {url && <img src={url} width="200" height="200" alt=""/>}
            </div>
        </div>
    );
}
