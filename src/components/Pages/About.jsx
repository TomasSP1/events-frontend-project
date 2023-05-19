import React from "react";

import "../CSS/About.css";

const About = () => {
  return (
    <div id="aboutContainer">
      <h2>A passion project</h2>

      <div id="kitmPic">
        <img
          src="https://kauno.diena.lt/sites/default/files/Vilniausdiena/Vartotoju%20zona/kamiles/img899705.jpg"
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div id="aboutText">
        <p>
          Welcome to our website, where we offer an innovative and user-friendly
          platform for event organizers to share their upcoming events with the
          world. We are students from Kauno Informacinių Technologijų Mokykla
          (Kaunas Information Technology School), passionate about creating an
          exceptional experience for both event organizers and participants.
        </p>
        <p>
          We believe that events are not just a form of entertainment, but an
          integral part of our social and cultural fabric, and our mission is to
          make it easier than ever for people to discover and participate in
          them. Our team of skilled developers and designers has put in
          countless hours to create a seamless and intuitive user experience,
          from registration to event submission and promotion.
        </p>
        <p>
          We understand that organizing an event can be a daunting task, which
          is why we provide a comprehensive set of tools and resources to help
          our users every step of the way. Whether you're a small community
          group hosting a local fair or a large corporation planning a major
          conference, our platform is the perfect place to showcase your event
          to a global audience.
        </p>
        <p>
          So why wait? Join us today and start sharing your event with the
          world!
        </p>
      </div>
    </div>
  );
};

export default About;
