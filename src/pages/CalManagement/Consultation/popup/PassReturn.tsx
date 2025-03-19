import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOkcertResult } from "../../../../api/crtfc";

const PassReturnPage = () => {
  const [mdlTkn, setMdlTkn] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { refetch } = useOkcertResult({ mdlTkn });

  useEffect(() => {
    const mdlTkn = searchParams.get("mdl_tkn");
    setMdlTkn(mdlTkn || "");

    if (!mdlTkn) {
      return;
    }

    const fetchData = async () => {
      try {
        const { data } = await refetch();

        if (data?.data.contents.rsltCd === "T993") {
          localStorage.setItem("authData", JSON.stringify(data?.data.contents));
          window.opener?.postMessage(
            { type: "AUTH_SUCCESS", data: "SUCCESS" },
            "*"
          );
        } else {
          window.opener?.postMessage(
            { type: "AUTH_FAILURE", data: "FALSE" },
            "*"
          );
        }
        // window.close();
      } catch (err) {
        console.error("에러 발생:", err);
      }
    };

    fetchData();
  }, [searchParams, refetch]);
  return <></>;
};

export default PassReturnPage;
