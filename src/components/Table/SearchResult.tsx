import GrayBox from "../Box/GrayBox";

export default function SearchResult({ total }: { total: number }) {
  return <GrayBox height={"40px"}>조회 건수 : {total} 건</GrayBox>;
}
