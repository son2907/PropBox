import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOkcertResult } from "../../../../api/crtfc";

const PassReturnPage = () => {
  const [searchParams] = useSearchParams();
  const { data, refetch } = useOkcertResult({
    mdlTkn: searchParams.get("mdl_tkn"),
  });
  console.log("결과:", data);

  //   useEffect(() => {

  //     // const fetchData = async () => {
  //     //   try {
  //     //     if (data?.data.contents.rsltCd === "T993") {
  //     //       localStorage.setItem("authData", JSON.stringify(data?.data.contents));
  //     //       window.opener?.postMessage(
  //     //         { type: "AUTH_SUCCESS", data: "SUCCESS" },
  //     //         "*"
  //     //       );
  //     //     } else {
  //     //       window.opener?.postMessage(
  //     //         { type: "AUTH_FAILURE", data: "FALSE" },
  //     //         "*"
  //     //       );
  //     //     }
  //     //     // window.close();
  //     //   } catch (err) {
  //     //     console.error("에러 발생:", err);
  //     //   }
  //     // };

  //     fetchData();
  //   }, []);
  return <div>테스트</div>;
};

export default PassReturnPage;
