import React, { useEffect, useState } from 'react';
import Teacher from './Teacher';

const Teachers = () => {
    const[faculty,setFaculty]=useState([]);

    useEffect(()=>{

        fetch('faculty.json')
        .then(res=>res.json())
        .then(data=>setFaculty(data))
    },[])
    return (
        <div>
           
             <h1 class="text-center mb-5">Faculty Members</h1>
                <div className="container">
                <div className="row ">
            {
                faculty.map(member=><Teacher member={member}></Teacher>)
            }
       </div>
       </div>
        </div>
    );
};

export default Teachers;