import React from "react";
import myImage from "../ju_logo.jpg";

function ImageComponent() {
    const imageStyles = {
      maxWidth: "16%",  
       
      height: "auto",       
      
    };
  
    return (
      
       
        <img src={myImage} alt="logo of JU" style={imageStyles} />
       
      
    );
  }
  
  export default ImageComponent;


