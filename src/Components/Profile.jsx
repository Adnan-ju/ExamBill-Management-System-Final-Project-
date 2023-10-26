import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header2 from './Header2';
import Footer from './Footer';
import '../CSS/profile.css'
import InputForm from './InputForm';

const Profile = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
  
    useEffect(() => {
      fetch('/faculty.json')
        .then((res) => res.json())
        .then((data) => {
          
          const matchingTeacher = data.find((teacher) => teacher.id === parseInt(id, 10));
          setTeacher(matchingTeacher);
          
        });
    }, [id]);
    return (
        <div>
            <Header2></Header2>
      {teacher && (
        <div class="container mt-5 d-flex justify-content-center  bg-info-subtle">
       
            <div class="d-flex align-items-center border border-3 p-3 m-3 gap-5">
                <div class="image">
            <img src={teacher.image} className='rounded' width={180} alt=''/>
            </div>
            <div class="">               
               <h4 class="fw-bold">{teacher.name}</h4>
               <span className='fst-italic'>{teacher.rank}</span>
            </div>
            </div>        
        </div>      
    
      )}
     
     {teacher !== null && <InputForm name={teacher.name}></InputForm>}
      <Footer></Footer>
        </div>
    );
};

export default Profile;