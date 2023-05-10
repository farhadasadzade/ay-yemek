import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { useMemoizedFn, useUpdateEffect } from "ahooks";
import { isEmpty, trim, lowerCase } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from "i18next";
import { Input, Button, Toast } from "common/components";
import { Footer, Header } from "modules";
import { api } from "common/api/api";
import "./style/index.scss";
import ChangePassword from "./ChangePassword";

const PHONE_REGEX =
  "(?:12|51|50|55|70|77)[^w]{0,2}[2-9][0-9]{2}[^w]{0,2}[0-9]{2}[^w]{0,2}[0-9]{2}";

const ForgotPassword = () => {
  const { t } = i18n;
  const language = lowerCase(localStorage.getItem("lang"));

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required()
      .matches(PHONE_REGEX, "Phone number is not valid")
      .min(9)
      .max(9),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const [isOTPSuccess, setOTPSuccess] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  const [resend, resendState] = api.useResendOtpMutation();

  const handleChangeInput = useMemoizedFn((e, name) => {
    methods.setValue(name, trim(e.target.value));
    methods.clearErrors(name);
  });

  React.useEffect(() => {
    methods.register("phone");
  }, [methods]);

  const handleSumbitRecover = useMemoizedFn(() => {
    const { phone } = methods.getValues();

    setPhone(`+994${phone}`);

    resend({
      language,
      body: {
        phone: `+994${phone}`,
      },
    });
  });

  useUpdateEffect(() => {
    if (!resendState.isLoading && resendState.isSuccess) {
      setOTPSuccess(true);
    }

    if (!resendState.isLoading && resendState.isError) {
      if (resendState.error.status === 404) {
        Toast.fire({
          icon: "error",
          title: resendState.error?.data?.message,
        });
      }
    }
  }, [resendState.isLoading]);

  return (
    <>
      <Header />
      <Row justify="center" className="mt-5 pt-5 mb-4">
        <h1 className="forgot__title">{t("forgotPasswordTitle")}</h1>
      </Row>
      {!isOTPSuccess ? (
        <>
          <Row justify="center">
            <Col span={8}>
              <form onSubmit={methods.handleSubmit(handleSumbitRecover)}>
                <Row className="mb-3">
                  <Input
                    type="phone"
                    label={`${t("phone")} (+994XXXXXXXXX)`}
                    isRequired
                    placeholder={t("enterYourPhone")}
                    onChange={(e) => handleChangeInput(e, "phone")}
                    error={!isEmpty(methods.formState.errors.phone)}
                    prefix="+994"
                  />
                </Row>
                <Row className="mt-5 mb-5">
                  <Button
                    htmlType="submit"
                    style={{ width: "100%" }}
                    type="primary"
                    isLoading={false}
                  >
                    {t("send")}
                  </Button>
                </Row>
              </form>
            </Col>
          </Row>
        </>
      ) : (
        <ChangePassword phone={phone} />
      )}
      <Footer />
    </>
  );
};

export default ForgotPassword;
