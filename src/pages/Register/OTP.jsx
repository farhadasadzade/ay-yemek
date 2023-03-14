import React from "react";
import OtpInput from "react-otp-input";

const OTP = () => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (otp) => setOtp(otp);

  return (
    <OtpInput
      value={otp}
      onChange={handleChange}
      numInputs={4}
      separator={<span>-</span>}
    />
  );
};

export default OTP;
