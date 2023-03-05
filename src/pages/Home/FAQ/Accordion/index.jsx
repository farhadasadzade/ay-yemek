import React from "react";
import { Collapse } from "antd";
import { map } from "lodash";
import { plus } from "assets/icons";

const ExpandIcon = ({ isActive }) => (
  <div className={`home__faq-expand ${isActive ? "active" : ""}`}>
    <img src={plus} alt="plus" />
  </div>
);

const Accordion = ({ items }) => {
  return (
    <Collapse
      className="home__faq-accordion"
      accordion
      expandIconPosition="end"
      expandIcon={(props) => <ExpandIcon {...props} />}
    >
      {map(items, ({ question, answer, id }) => (
        <Collapse.Panel
          className="home__faq-item"
          key={id}
          header={<h2 className="home__faq-title">{question}</h2>}
        >
          <p className="home__faq-text">{answer}</p>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default Accordion;
