import React from 'react';
import { FaReact, FaSass, FaNodeJs } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import './About.scss';

const About = () => {
  return (
    <div className="d-flex flex-column align-items-center full-height">
      <h1>Made with the MERN Stack</h1>
      <p>This application was built using the following:</p>
      <br />
      <div className="list">
        <FaReact className="list--icon" />
        <FaSass className="list--icon" />
        <DiMongodb className="list--icon" />
        <FaNodeJs className="list--icon" />
      </div>
    </div>
  );
};

export default About;
