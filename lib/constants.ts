export const sidebarLinks = [
  {
    imgUrl: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgUrl: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgUrl: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgUrl: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

export const authDefaultValues = (type: "sign-in" | "sign-up") => {
  const signInFields = {
    email: "",
    password: "",
  };

  const signUpFields = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    dateOfBirth: "",
    ssn: "",
  };

  return {
    ...signInFields,
    ...(type === "sign-up" && signUpFields),
  };
};
