export default function SearchResult({ total }: { total: number }) {
  return (
    <div
      style={{ height: "30px", width: "100%", backgroundColor: "lightgrey" }}
    >
      조회 건수 : {total} 건
    </div>
  );
}
