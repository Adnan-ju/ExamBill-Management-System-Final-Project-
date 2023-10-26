import React from 'react';
import banner from '../Images/banner.png';
import '../CSS/banner.css'

const Banner = () => {
    return (
        <div className=' banner-img d-flex justify-content-center align-items-center'>
            <img src={banner} alt="" height={570}width={1400}/>
            <div class="container">
  <div class="row">
    <div class="col-md-12 text-center">
      <h3 class="animate-charcter"> CSE</h3>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;