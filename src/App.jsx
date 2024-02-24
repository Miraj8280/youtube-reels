import { useState,useEffect } from 'react';
import './App.css';
import Video from './Component/VideoPlayer';
import videos from './utils/shortsData';

function App() {
 const [video, setVideo]=useState([]);
      useEffect(()=>{
          setVideo(videos);
      },[]);
 return (
    <div className="App">
        <div className="app_video"> 
         {
           videos.map((vid)=>(
           <Video 
            id={vid.id} 
            key={vid.id} 
            src={vid.url} 
            desc={vid.desc}
          /> 
           ))} 
        </div>
    </div>
  );
}

export default App;
