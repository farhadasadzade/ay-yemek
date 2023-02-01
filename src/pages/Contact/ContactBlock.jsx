import { map } from "lodash";
import React from "react";

const ContactBlock = ({ icon, name, texts }) => {
  return (
    <div className="contact__block">
      <div className="contact__block-info">
        <div className="contact__block-img">
          <img src={icon} alt="icon" />
        </div>
        <div className="contact__block-name">
          <h2>{name}</h2>
        </div>
      </div>
      <div className="contact__block-text">
        {map(texts, (t) => (
          <p>{t}</p>
        ))}
      </div>
    </div>
  );
};

export default ContactBlock;
