import { useEffect } from "react";
import { useGetOkcert } from "../../../../api/crtfc";

const PassReturnPage = () => {
  const { data: passResult } = useGetOkcert();

  useEffect(() => {
    if (!passResult) return;

    if (passResult.data.contents.crtfcYn == "Y") {
      window.opener?.postMessage({ type: "AUTH_SUCCESS", data: "B000" }, "*");
    } else {
      window.opener?.postMessage({ type: "AUTH_FAILURE", data: "FALSE" }, "*");
    }
    window.close();
  }, [passResult]);

  return <></>;
};

export default PassReturnPage;
