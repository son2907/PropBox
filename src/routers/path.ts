const PathConstants = {
  Home: "/",
  Login: "/login",
  Test: "/test",
  Call: {
    Consultation: "/call/consultation",
    Analysis: "/call/analysis",
    Management: "/call/management",
    Information: "/call/information",
  },
  Message: {
    Auto: "/message/auto",
    Bulk: "/message/bulk",
    Declaration: "/message/declartion", // 오타 수정: declartion -> declaration
    Reject: "/message/reject",
  },
  Customer: {
    Registration: "/customer/registration",
  },
  System: {
    Solution: "/system/solution",
    User: "/system/user",
    Member: "/system/member",
    Local: "/system/local",
    LocalMember: "/system/localmember",
    Auth: "/system/auth",
  },
};

export default PathConstants;
