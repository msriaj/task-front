import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="bg-blue-300 h-screen flex justify-center items-center">
      <div class=" w-40 md:w-48">
        <svg
          version="1.1"
          id="hei-loader"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="-16 5.5 115.3 141.5"
          style={{ enableBackground: "new -16 5.5 115.3 141.5" }}
          xmlSpace="preserve"
        >
          <g id="bulb_1_">
            <path
              id="bulb-body-fill"
              class="st0"
              d="M79.7,67.8c0-18.4-16.9-33.2-37.7-33.2S4.3,49.4,4.3,67.8c0,7.3,2.7,14,7.1,19.4
		c0.5,0.7,15.5,21.9,16.7,30.8c1.3,9.1,1.3,11.5,1.3,11.5h25.2c0,0,0-2.4,1.3-11.5c1.3-8.9,16.2-30,16.7-30.8
		C77.1,81.8,79.7,75.1,79.7,67.8"
            />
            <path
              id="bulb-body"
              class="st1"
              d="M79.4,67.8c0-18.4-16.9-33.2-37.7-33.2S4,49.4,4,67.8c0,7.3,2.7,14,7.1,19.4
		c0.5,0.7,15.5,21.9,16.7,30.8c1.3,9.1,1.3,11.5,1.3,11.5h25.2c0,0,0-2.4,1.3-11.5c1.3-8.9,16.2-30,16.7-30.8
		C76.8,81.8,79.4,75.1,79.4,67.8"
            />
            <g>
              <line id="one" class="st2" x1="-15.3" y1="36.8" x2="-4.8" y2="47.4" />
              <line id="two" class="st2" x1="-3.4" y1="16.6" x2="8.1" y2="32.7" />
              <line id="three" class="st2" x1="21" y1="13.2" x2="24.5" y2="26.8" />
              <line id="four" class="st2" x1="41.4" y1="5.5" x2="42.3" y2="24.9" />
              <line id="five" class="st2" x1="61.9" y1="14.2" x2="57.8" y2="27.9" />
              <line id="six" class="st2" x1="88.2" y1="19.4" x2="74.5" y2="34" />
              <line id="seven" class="st2" x1="98.7" y1="40" x2="86.2" y2="48.8" />
            </g>
            <line id="middle-screw" class="st1" x1="25.9" y1="138.5" x2="58" y2="138.5" />
            <line id="bottom-screw" class="st1" x1="25.9" y1="146" x2="58" y2="146" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
