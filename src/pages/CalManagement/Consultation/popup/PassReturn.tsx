import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useOkcertResult } from "../../../../api/crtfc";

const PassReturnPage = () => {
  const [searchParams] = useSearchParams();
  const { data } = useOkcertResult({
    mdlTkn: searchParams.get("mdl_tkn"),
  });
  console.log("결과:", data);
  console.log("이건:", searchParams.get("mdl_tkn"));

  useEffect(() => {
    if (!data) {
      console.log("없음");
      return;
    }
    if (
      data?.data.contents.rsltCd == "B000" ||
      data?.data.contents.rsltCd == "T993"
    ) {
      localStorage.setItem("authData", JSON.stringify(data?.data.contents));
      window.opener?.postMessage({ type: "AUTH_SUCCESS", data: "B000" }, "*");
    } else {
      window.opener?.postMessage({ type: "AUTH_FAILURE", data: "FALSE" }, "*");
    }
    window.close();
  }, [data]);
};

export default PassReturnPage;
