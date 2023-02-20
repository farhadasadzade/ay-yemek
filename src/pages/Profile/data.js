import { lock, order, user, walletOrange } from "assets/icons";

export const navbarItems = [
  {
    title: "myInfo",
    icon: user,
    link: "user",
    color: "#35313F",
  },
  {
    title: "activeOrder",
    icon: order,
    link: "active-orders",
    color: "#2BAD3F",
  },
  {
    title: "changePassword",
    icon: lock,
    link: "change-password",
    color: "#35313F",
  },
  {
    title: "myPayments",
    icon: walletOrange,
    link: "payments",
    color: "#35313F",
  },
];
