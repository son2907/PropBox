export function regPhoneNumber(value: string) {
  let numericValue = value.replace(/\D/g, "");

  if (numericValue.length === 8) {
    // 8자리 업체번호 1668-0000
    numericValue = numericValue.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else if (numericValue.startsWith("02")) {
    //02로 시작하는 전화번호
    numericValue = numericValue.replace(/^(02)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  } else if (numericValue.length === 11) {
    // 11자리 휴대폰 번호
    numericValue = numericValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (numericValue.startsWith("080")) {
    //080으로 시작하며 중간자리가 3자리인 전화번호
    numericValue = numericValue.replace(/^(080)(\d{3})(\d{4})$/, "$1-$2-$3");
  } else if (numericValue.length === 10) {
    //10자리 서울 외 전화번호
    numericValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return numericValue;
}
