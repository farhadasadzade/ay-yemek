import React from "react";
import { Modal } from "antd";

const Rules = ({ visible, toggleRuleModal, termsData }) => {
  return (
    <Modal
      bodyStyle={{ overflowY: "scroll", maxHeight: "700px" }}
      onCancel={toggleRuleModal}
      footer={false}
      open={visible}
      maskStyle={{ overflow: "hidden" }}
      className="rules__modal"
    >
      {termsData?.map(({ title, description, id }) => (
        <div>
          <h2>{title}</h2>
          {description?.split('<br>')?.map((desc) => <p>{desc}</p>)}
        </div>
      ))}
    </Modal>
  );
};

export default Rules;
