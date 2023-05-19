import React from "react";
import Cookies from "js-cookie";
import { useCreation } from "ahooks";
import i18n from "i18next";
import { api } from "common/api/api";
import { lowerCase } from "lodash";
import { Table } from "antd";

const convertDate = (date) => date?.split("-")?.reverse()?.join(".");

const Payments = () => {
  const { t } = i18n;

  const language = lowerCase(localStorage.getItem("lang"));
  const userToken = Cookies.get("userToken");

  const { data: userPayments, isFetching: isUserPaymentsFetching } =
    api.useGetUserPaymentsQuery({
      language,
      userToken: `Bearer ${userToken}`,
    });

  const tableColumns = useCreation(
    () => [
      {
        title: <p className="table__title">{t("tableCategory")}</p>,
        key: "name",
        dataIndex: "name",
        render: (data) => <p className="table__cell">{data}</p>,
        width: 200,
      },
      {
        title: <p className="table__title">{t("tablePacketName")}</p>,
        key: "packetName",
        dataIndex: "packetName",
        render: (data) => <p className="table__cell">{data}</p>,
        width: 200,
      },
      {
        title: <p className="table__title">{t("tablePrice")}</p>,
        key: "price",
        dataIndex: "price",
        render: (data) => <p className="table__cell">{data} AZN</p>,
        width: 200,
      },
      {
        title: <p className="table__title">{t("tableDate")}</p>,
        key: "date",
        dataIndex: "date",
        render: (data) => <p className="table__cell">{data}</p>,
        width: 200,
      },
    ],
    []
  );

  return (
    <div className="profile__main">
      <Table
        columns={tableColumns}
        dataSource={userPayments?.data
          ?.filter((payment) => payment?.order_status === "approved")
          ?.map((data) => ({
            name: data?.package?.category?.name,
            packetName: data?.package?.name,
            price: data?.amount,
            date:
              convertDate(data?.packageOrder?.started_date) +
              " - " +
              convertDate(data?.packageOrder?.ended_date),
          }))}
        scroll={{ x: true }}
        loading={isUserPaymentsFetching}
      />
    </div>
  );
};

export default Payments;
