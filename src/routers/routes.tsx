import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layout";
import PathConstants from "./path";
import Test from "../pages/test";
import Login from "../pages/Login";
import CallConsultation from "../pages/CalManagement/Consultation";
import SearchCustomer from "../pages/CalManagement/Consultation/popup/SearchCustomer";
import ConsultationStatus from "../pages/CalManagement/Consultation/popup/ConsultationStatus";
import SMSSending from "../pages/CalManagement/Consultation/popup/SMSSending";
import CallLog from "../pages/CalManagement/Consultation/popup/CallLog";
import Analysis from "../pages/CalManagement/Analysis";
import DataManage from "../pages/CalManagement/DataManage";
import UploadConsultation from "../pages/CalManagement/DataManage/popup/UploadConsultation";
import CreateConsultation from "../pages/CalManagement/DataManage/popup/CreateConsultation";
import TopicRegistration from "../pages/CalManagement/DataManage/popup/TopicRegistration";
import SolutionManagement from "../pages/SysManagement/Solution";
import BasicInfo from "../pages/CalManagement/BasicInfo";
import AutoMessage from "../pages/Message/Auto";
import PhoneNumber from "../pages/Message/Auto/popup/PhoneNumber";
import BulkMessage from "../pages/Message/Bulk";
import RejectMessage from "../pages/Message/Reject";
import ResultMessage from "../pages/Message/Result";
import DeclarationMessage from "../pages/Message/Declaration";
import Spam from "../pages/Message/Declaration/popup/Spam";
import GroupCell from "../pages/Message/Declaration/popup/GroupCell";
import RegistrationExel from "../pages/Message/Reject/popup/RegistrationExel";
import SMSDetail from "../pages/Message/Result/popup/SMSDetail";
import Registration from "../pages/CustomerManagement/Registration";
import UploadRegistration from "../pages/CustomerManagement/Registration/popup/UploadRegistration";
import GroupManagement from "../pages/CustomerManagement/Registration/popup/GroupManagement";
import UserManagement from "../pages/SysManagement/User";
import UserUpload from "../pages/SysManagement/User/popup/UploadUser";
import AuthManagement from "../pages/SysManagement/AuthManagement";
import MemberMenuPermission from "../pages/SysManagement/AuthManagement/popup/MemberMenuPermission";
import MenuPermissionCopy from "../pages/SysManagement/AuthManagement/popup/MenuPermissionCopy";
import PermissionRevoke from "../pages/SysManagement/AuthManagement/popup/PermissionRevoke";
import MemberManagement from "../pages/SysManagement/Member";
import LocalManagement from "../pages/SysManagement/Local";
import LocalRegistration from "../pages/SysManagement/Local/popup/LocalRegistration";
import AuthGuard from "./guard/AuthGuard";
import PhoneAdd from "../pages/SysManagement/Phone/popup/PhoneAdd";
import DeviceType from "../pages/SysManagement/Phone/popup/DeviceType";
import NoticeList from "../pages/Notice";
import NoticeAdd from "../pages/Notice/NoticeAdd";
import NoticeDetail from "../pages/Notice/NoticeDetail";
import NoticeModify from "../pages/Notice/NoticeModify";
import FAQList from "../pages/FAQ";
import FAQAdd from "../pages/FAQ/FAQAdd";
import FAQDetail from "../pages/FAQ/FAQDetail";
import FAQModify from "../pages/FAQ/FAQModify";
import LocalmemberManagement from "../pages/SysManagement/Localmember";
import AuthCode from "../pages/SysManagement/AuthCode";
import ReceivingNumber from "../pages/SysManagement/ReceivingNumber";
import SiteSelection from "../pages/SiteSelection";
import NetworkSetupPop from "../pages/NetworkSetup/popup";
import Err404 from "../pages/ERROR/Err404";
import Launcher from "../pages/Launcher";
import PhoneSetting from "../pages/SysManagement/Phone";
import NetworkSetup from "../pages/NetworkSetup";
import PasswordCheck from "../pages/Mypage/popup/PasswordCheck";
import UserInfoPopup from "../pages/Mypage";
import AdminInfoPopup from "../pages/Mypage/AdminInfo";
import RegisterSenerNumber from "../pages/CalManagement/Consultation/popup/RegisterSenerNumber";
import SoketGuard from "./guard/SoketGuard";
import UpdateUSer from "../pages/SysManagement/User/popup/UpdateUser";
import LocalUpdate from "../pages/SysManagement/Local/popup/LocalModify";
import CustomerSMSSending from "../pages/CustomerManagement/Registration/popup/CustomerSMSSending";
import PassReturnPage from "../pages/CalManagement/Consultation/popup/PassReturn";

export const routes: RouteObject[] = [
  {
    element: (
      <AuthGuard>
        <SoketGuard>
          <DefaultLayout />
        </SoketGuard>
      </AuthGuard>
    ),
    children: [
      { path: PathConstants.Home, element: <Launcher /> },
      {
        children: [
          {
            path: PathConstants.Login,
            element: <Login />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Test,
            element: <Test />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Call.Consultation,
            element: <CallConsultation />,
          },
          {
            path: PathConstants.Call.Analysis,
            element: <Analysis />,
          },
          {
            path: PathConstants.Call.Management,
            element: <DataManage />,
          },
          {
            path: PathConstants.Call.Information,
            element: <BasicInfo />,
          },
          {
            path: PathConstants.Call.PASS,
            element: <PassReturnPage />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Message.Auto,
            element: <AutoMessage />,
          },
          {
            path: PathConstants.Message.Bulk,
            element: <BulkMessage />,
          },
          {
            path: PathConstants.Message.Declaration,
            element: <DeclarationMessage />,
          },
          {
            path: PathConstants.Message.Reject,
            element: <RejectMessage />,
          },
          {
            path: PathConstants.Message.Result,
            element: <ResultMessage />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Customer.Registration,
            element: <Registration />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.System.Solution,
            element: <SolutionManagement />,
          },
          {
            path: PathConstants.System.User,
            element: <UserManagement />,
          },
          {
            path: PathConstants.System.Member,
            element: <MemberManagement />,
          },
          {
            path: PathConstants.System.Local,
            element: <LocalManagement />,
          },
          {
            path: PathConstants.System.LocalMember,
            element: <LocalmemberManagement />,
          },
          {
            path: PathConstants.System.Auth,
            element: <AuthManagement />,
          },
          {
            path: PathConstants.System.NetworkSetup,
            element: <NetworkSetup />,
          },
          {
            path: PathConstants.System.AuthCode,
            element: <AuthCode />,
          },
          {
            path: PathConstants.System.ReceivingNumber,
            element: <ReceivingNumber />,
          },
          {
            path: PathConstants.System.Phone,
            element: <PhoneSetting />,
          },
        ],
      },
      {
        children: [
          {
            // 모든 페이지의 404 경로 처리
            path: "*", // 경로가 일치하지 않는 모든 요청을 처리
            element: <Err404 />, // 404 페이지
          },
        ],
      },
    ],
  },
  // 팝업 경로는 DefaultLayout을 적용하지 않음
  {
    path: PathConstants.Call.SearchCustomer,
    element: <SearchCustomer />,
  },
  {
    path: PathConstants.Call.ConsultationStatus,
    element: <ConsultationStatus />,
  },
  {
    path: PathConstants.Call.SmsSending,
    element: <SMSSending />,
  },
  {
    path: PathConstants.Call.RegisterSenderNumber,
    element: <RegisterSenerNumber />,
  },
  {
    path: PathConstants.Call.CallLog,
    element: <CallLog />,
  },
  {
    path: PathConstants.Call.UploadConsultation,
    element: <UploadConsultation />,
  },
  {
    path: PathConstants.Call.CreateConsultation,
    element: <CreateConsultation />,
  },
  {
    path: PathConstants.Call.TopicRegistration,
    element: <TopicRegistration />,
  },
  {
    path: PathConstants.Message.PhoneNumber,
    element: <PhoneNumber />,
  },
  {
    path: PathConstants.Message.Sapm,
    element: <Spam />,
  },
  {
    path: PathConstants.Message.GroupCell,
    element: <GroupCell />,
  },
  {
    path: PathConstants.Message.RegistrationExel,
    element: <RegistrationExel />,
  },
  {
    path: PathConstants.Message.SMSDetail,
    element: (
      <SMSDetail msgKnd="" yyyyMm="" idx={0} onClose={() => {}} modalId="" />
    ),
  },
  {
    path: PathConstants.Customer.RegistrationUpload,
    element: <UploadRegistration />,
  },
  {
    path: PathConstants.Customer.CustomerGroupManagement,
    element: <GroupManagement />,
  },
  {
    path: PathConstants.System.UserUpload,
    element: <UserUpload />,
  },
  {
    path: PathConstants.System.UpdateUser,
    element: <UpdateUSer />,
  },
  {
    path: PathConstants.System.MemberMenuPermission,
    element: <MemberMenuPermission />,
  },
  {
    path: PathConstants.System.MenuPermissionCopy,
    element: <MenuPermissionCopy />,
  },
  {
    path: PathConstants.System.PermissionRevoke,
    element: <PermissionRevoke />,
  },
  {
    path: PathConstants.System.LocalRegistration,
    element: <LocalRegistration />,
  },
  {
    path: PathConstants.System.PhoneAdd,
    element: <PhoneAdd />,
  },
  {
    path: PathConstants.System.DeviceType,
    element: <DeviceType />,
  },
  {
    path: PathConstants.Notice.NoticeList,
    element: <NoticeList />,
  },
  {
    path: PathConstants.Notice.NoticeAdd,
    element: <NoticeAdd />,
  },
  {
    path: PathConstants.Notice.NoticeDetail,
    element: <NoticeDetail />,
  },
  {
    path: PathConstants.Notice.NoticeModify,
    element: <NoticeModify />,
  },
  {
    path: PathConstants.FAQ.FAQList,
    element: <FAQList />,
  },
  {
    path: PathConstants.FAQ.FAQAdd,
    element: <FAQAdd />,
  },
  {
    path: PathConstants.FAQ.FAQDetail,
    element: <FAQDetail />,
  },
  {
    path: PathConstants.FAQ.FAQModify,
    element: <FAQModify />,
  },
  {
    path: PathConstants.SiteSelection,
    element: <SiteSelection />,
  },
  {
    path: PathConstants.NetworkSetup,
    element: <NetworkSetupPop />,
  },
  {
    path: PathConstants.MyPage.PasswordCheck,
    element: <PasswordCheck />,
  },
  {
    path: PathConstants.MyPage.UserInfoPopup,
    element: <UserInfoPopup />,
  },
  {
    path: PathConstants.MyPage.AdminInfoPopup,
    element: <AdminInfoPopup />,
  },
  {
    path: PathConstants.System.LocalUpdate,
    element: <LocalUpdate />,
  },
  {
    path: PathConstants.Customer.CustomerSmsSending,
    element: <CustomerSMSSending />,
  },
];
