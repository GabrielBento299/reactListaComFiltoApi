import React, { useEffect, useState } from 'react';
import './style.css';
import SearchInput from './components/Searchinput/SearchInput';
import { AiOutlineReload } from "react-icons/ai";
import Header from './components/header/Header';
 
 const api = 'https://kitsu.io/api/edge/';
 

export default function App() {

  const [info, setInfo] = useState({});
  const [text, setText] = useState('');
 
  useEffect(() => {
    if(text ){
      setInfo({});
      fetch( `${api}anime?filter[text]=${text}&page[limit]=13 `)
      .then((response) =>  response.json())
      .then((response) => {
       setInfo(response);
      });
    }
  },[text]);
 
  return (
    
    <div id="box">
    
    
      <Header />
    
    <div className="App">

      
 
       
      <div className="container"> 
      <SearchInput
       value={ text } 
       onChange={(search) => setText(search )}
       />
        
       {text && !info.data && (
        <AiOutlineReload className="icon" />
       )}
       </div> 
       {info.data && (
         <ul className="animes-list">
           {info.data.map((anime) => (
             <li key={anime.id}>
               <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} />
              <div className="anime-title"> 
               {anime.attributes.canonicalTitle}
               </div>
             </li> 
           ))}
         </ul>
       )}


       

</div>

</div>


  );
}

 
