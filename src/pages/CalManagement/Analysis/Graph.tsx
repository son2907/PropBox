import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton } from "../../../components/Button";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Graph({ graphData }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox justifyContent={"flex-end"} gap={1}>
        <BasicButton onClick={handlePrint}>출력</BasicButton>
      </GrayBox>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="itemNm" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="cnt"
            fill="#408CF1"
            activeBar={<Rectangle stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
}
