import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layout";
import PathConstants from "./path";
import Main from "../pages/main";
import Test from "../pages/test";
import Login from "../pages/Login";
import NetworkSetup from "../pages/NetworkSetup";
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
import Preview from "../pages/Message/Bulk/popup/Preview";
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
import PhoneManagement from "../pages/SysManagement/Phone";
import PhoneAdd from "../pages/SysManagement/Phone/popup/PhoneAdd";
import DeviceType from "../pages/SysManagement/Phone/popup/DeviceType";
import LocalmemberManagement from "../pages/SysManagement/Localmember";
import AuthCode from "../pages/SysManagement/AuthCode";
import ReceivingNumber from "../pages/SysManagement/ReceivingNumber";

export const routes: RouteObject[] = [
  {
    element: (
      // <AuthGuard>
      <DefaultLayout />
      // </AuthGuard>
    ),
    // 에러 엘리먼트 추가 필요
    children: [
      { path: PathConstants.Home, element: <Main /> },
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
            //element: <div>솔루션 및 메뉴 관리</div>,
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
            element: <LocalManagement/>,
          },
          {
            path: PathConstants.System.LocalMember,
            element: <LocalmemberManagement/>,
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
            element: <AuthCode/>,
          },
          {
            path: PathConstants.System.ReceivingNumber,
            element: <ReceivingNumber/>,
          },
          {
            path: PathConstants.System.Phone,
            element: <PhoneManagement/>,
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
    path: PathConstants.Message.Preview,
    element: <Preview />,
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
    element: <SMSDetail />,
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
    element: <LocalRegistration/>,
  },
  {
    path: PathConstants.System.PhoneAdd,
    element: <PhoneAdd/>,
  },
  {
    path: PathConstants.System.DeviceType,
    element: <DeviceType/>,
  },
];
