const PathConstants = {
  Home: "/",
  Login: "/login",
  Test: "/test",
  Call: {
    Consultation: "/call/consultation",
    SearchCustomer: "/call/consultation/customer-search",
    ConsultationStatus: "/call/consultation/consultation-status",
    CallLog: "/call/consultation/call-log",
    SmsSending: "/call/consultation/sms-sending",
    Analysis: "/call/analysis",
    UploadConsultation: "/call/analysis/upload-consultation",
    CreateConsultation: "/call/analysis/create-consultation",
    TopicRegistration: "/call/analysis/topic-registration",
    Management: "/call/management",
    Information: "/call/information",
  },
  Message: {
    Auto: "/message/auto",
    Bulk: "/message/bulk",
    Declaration: "/message/declartion",
    Reject: "/message/reject",
    PhoneNumber: "/message/auto/input-phoneNumber",
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
    NetworkSetup: "/system/networksetup",
  },
};

export default PathConstants;
