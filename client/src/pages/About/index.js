import React from 'react';
import { FaReact, FaSass, FaNodeJs } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';

const About = () => {
  return (
    <div className="d-flex flex-column align-items-center ">
      <h1>Made with the MERN Stack</h1>
      <p>This application was built using with the following:</p>
      <br />
      <div>
        <FaReact />
        <FaSass />
        <DiMongodb />
        <FaNodeJs />
      </div>
    </div>
  );
};

export default About;
