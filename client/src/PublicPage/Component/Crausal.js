import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay>
    <div>
      <img alt="" src="https://www.nsbpictures.com/wp-content/uploads/2021/01/background-for-thumbnail-youtube-14.jpg" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img alt="" src="https://www.insertcart.com/wp-content/uploads/2018/05/thumbnail.jpg" />
      <p className="legend">Legend 2</p>
    </div>
   
  </Carousel>
);
