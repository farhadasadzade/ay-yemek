import React from "react";
import { Link } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { Row } from "antd";
import { RenderIf } from "common/components";
import Navbar from "pages/Profile/Navbar";
import { user, exitWhite } from "assets/icons";

const MobileUserMenu = ({
  visible,
  toggleMobileUserMenu,
  isLogoutModalVisible,
  setLogoutModalVisible,
  userName,
}) => {
  const [background, setBackground] = React.useState({ background: "none" });

  useUpdateEffect(() => {
    if (visible) {
      setBackground({ background: "rgba(0, 0, 0, 0.35)", display: "block" });
      return;
    }

    setTimeout(() => setBackground({ background: "none" }), 1000);
  }, [visible]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          display: "none",
          top: "0",
          right: "0",
          transition: "all 1s",
          ...background,
        }}
      ></div>
      <div className={`mobile__user ${visible ? "active" : ""}`}>
        <div className="mobile__user-top">
          <RenderIf condition={userName}>
            <Link to="/profile">
              <Row wrap={false}>
                <img className="me-2" src={user} alt="user-icon" />
                <p className="header__user-name me-2">{userName}</p>
              </Row>
            </Link>
          </RenderIf>
          <RenderIf condition={!userName}>
            <div className="button-loader"></div>
          </RenderIf>
        </div>
        <div className="mobile__user-bottom">
          <Navbar
            url="/profile"
            isLogoutModalVisible={isLogoutModalVisible}
            setLogoutModalVisible={setLogoutModalVisible}
          />
        </div>
      </div>
      <RenderIf condition={visible}>
        <img
          style={{ cursor: "pointer" }}
          onClick={toggleMobileUserMenu}
          className="mobile__user-exit"
          src={exitWhite}
          alt="exit"
        />
      </RenderIf>
    </>
  );
};

export default MobileUserMenu;
