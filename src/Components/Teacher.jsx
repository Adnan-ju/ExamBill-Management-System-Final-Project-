import React from 'react';
import { Link } from 'react-router-dom';
const Teacher = ({member}) => {
    const{id,name,image,rank}=member;
    return (
       
             <div class="col-lg-3 col-md-4">
                <div class="card mb-4">
                  <div class="card-body text-center">
                    <img src={image} alt="avatar"
                      class="rounded-circle img-fluid"width={150}/>
                    <h5 class="my-3"> {name}</h5>
                    <p class="text-muted mb-1">{rank}</p><br/>
                    <div class="d-flex justify-content-center mb-2">
                     <Link to={`/teachers/${id}`}><button type="button" class="btn btn-outline-primary ms-1 m-auto" >Make Bill</button></Link> 
                    </div>
                  </div>
            </div>
      </div>
      
    );
};

export default Teacher;