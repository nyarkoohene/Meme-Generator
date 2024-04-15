import React from "react";

function MemeForm(){
    const [meme, setMeme]=React.useState({
         
        topText:'',
        bottomTtext:'',
        randomImage:''
         
    } )
    
    const [allMemeImages ,setAllMemeImages] = React.useState()
    React.useEffect(function() {
        console.log("Effect function ran") 
        fetch(`https://api.imgflip.com/get_memes`)
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes ))
    },[])

    function getMemeImage(){
        const memeArray= allMemeImages
        const memeNo= Math.floor(Math.random()*memeArray.length)
        const meme = memeArray[memeNo]
        const url =meme.url
        setMeme(prevMeme =>{
            return {
               ...prevMeme,
                randomImage:url  
            }
        })   
    }

    

    
    function handleChange(event){
        const {name,value}=event.target

        setMeme(prevMemeData=>{
            return{
                ...prevMemeData,
                [name]:value
            }
        })
            
    }

    console.log(meme)
 
    return(
        <div className="form"> 
            <input 
                type="text" 
                name="topText" 
                className="inputs" 
                id="top-text" 
                placeholder="Top Text"
                onChange={handleChange}
                value={meme.topText }
                
            />

            <input 
                type="text" 
                name="bottomTtext" 
                className="inputs" 
                id="btm-text" 
                placeholder="Bottom Text"
                onChange={handleChange}
                value={meme.bottomTtext}
                
            />
            
            <button type="button" className="meme-btn" onClick={ getMemeImage}>
                Get a new Image <i className='far fa-image'></i>
            </button>
            <div className="meme-container">
                {meme.randomImage && <img className="meme-img" src={meme.randomImage} alt="Meme"/>}
                {meme.topText && <h3 className="meme--text top">{meme.topText}</h3>}
                {meme.bottomTtext && <h3 className="meme--text bottom">{meme.bottomTtext}</h3>}
            </div>
        </div>
        
    )
}

export default MemeForm