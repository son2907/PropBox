export type DeleteUserType = {
    userNo: string | null,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    pwdNo: string,
    mbtlNo: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    userId: string,
};

export type UserType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    mbtlNo: string,
    attlistMbtlNo: string,
    encptMbtlNo: string,
    advrtsAgreYn: string,
    advrtsAgreDttm: string,
    delYn: string,
    rmk: string,
    userId: string
};

export type CompanyType = {
    userNo: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    fxnum: string,
    rmk: string,
    useYn: string,
    userId: string
};

export type UserInsertType = {
    user : UserType,
    company: CompanyType,
};