import React from "react";
import OtpInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
import { useHistory } from "react-router-dom";
import { useMount } from "ahooks";
import i18n from "i18next";
import { lowerCase } from "lodash";
import { Button, Toast } from "common/components";
import { api } from "common/api/api";
import { useUpdateEffect } from "ahooks";
import { Row } from "antd";

const OTP = ({ phone }) => {
  const { t } = i18n;

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300);

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: time,
  });

  const history = useHistory();
  const language = lowerCase(localStorage.getItem("lang"));

  const [otp, setOtp] = React.useState("");

  const [verify, verifyState] = api.useVerifyMutation();
  const [resend, resendState] = api.useResendMutation();

  const handleChange = (otp) => setOtp(otp);

  const submitVerify = () => {
    verify({
      body: { phone, otp_code: otp },
      language,
    });
  };

  const resendOtp = () => {
    if (isRunning) return;

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + 300);
    restart(newTime);
    resend({
      body: { phone },
      language,
    });
  };

  useUpdateEffect(() => {
    if (!verifyState.isLoading && verifyState.isSuccess) {
      Toast.fire({
        icon: "success",
        title: t("registrationSuccess"),
      });

      setTimeout(() => {
        localStorage.setItem("userToken", verifyState.data?.data);
        history.push("/home");
      }, 1000);
    }
  }, [verifyState.isLoading]);

  useUpdateEffect(() => {
    if (!verifyState.isLoading && verifyState.isError) {
      Toast.fire({
        icon: "error",
        title: t("codeIsInvalid"),
      });
    }
  }, [verifyState.isLoading]);

  useMount(() => {
    setTimeout(() => window.scrollTo(0, 0), 300);
  });

  return (
    <div
      className="otp"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2 className="mb-3">{t("verifyOTP")}</h2>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={4}
        separator={<span>-</span>}
      />
      <Button
        className="mt-3"
        type="primary"
        onClick={submitVerify}
        isLoading={verifyState.isLoading}
        disabled={otp?.length !== 4}
      >
        {t("verify")}
      </Button>
      <Row className="my-3">
        <p
          onClick={resendOtp}
          className="me-3"
          style={{
            color: "#f75c03",
            cursor: `${isRunning ? "not-allowed" : "pointer"} `,
          }}
        >
          {t("resend")}
        </p>
        <p>
          {minutes}:{seconds}
        </p>
      </Row>
    </div>
  );
};

export default OTP;
