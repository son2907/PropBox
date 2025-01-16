import BasicTable from "../../../../components/Table/BasicTable";
import { useReportList } from "../../../../api/callCnslt";
import TableBox from "../../../../components/Box/TableBox";

export default function ConsultationStatus() {
  // 단일 선택
  const { data: reportListApi } = useReportList();

  return (
    <TableBox>
      <TableBox.Inner>
        <BasicTable data={reportListApi?.data.contents || []}>
          <BasicTable.Th>시간</BasicTable.Th>
          <BasicTable.Th>받기</BasicTable.Th>
          <BasicTable.Th>걸기</BasicTable.Th>
          <BasicTable.Th>전체</BasicTable.Th>

          <BasicTable.Tbody>
            {reportListApi?.data.contents.map((item, index) => {
              const isLastItem =
                index === reportListApi.data.contents.length - 1; // 마지막 아이템 여부 확인
              return (
                <BasicTable.Tr key={index}>
                  {isLastItem ? (
                    <>
                      <BasicTable.Th>{item.tmzonNm}</BasicTable.Th>
                      <BasicTable.Th>{item.callN}</BasicTable.Th>
                      <BasicTable.Th>{item.callY}</BasicTable.Th>
                      <BasicTable.Th>{item.callTot}</BasicTable.Th>
                    </>
                  ) : (
                    <>
                      <BasicTable.Td>{item.tmzonNm}</BasicTable.Td>
                      <BasicTable.Td>{item.callN}</BasicTable.Td>
                      <BasicTable.Td>{item.callY}</BasicTable.Td>
                      <BasicTable.Td>{item.callTot}</BasicTable.Td>
                    </>
                  )}
                </BasicTable.Tr>
              );
            })}
          </BasicTable.Tbody>
        </BasicTable>
      </TableBox.Inner>
    </TableBox>
  );
}
