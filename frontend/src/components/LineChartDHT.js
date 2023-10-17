import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LineChartDHT(props) {
  let lineData = props.data;

  return (
    <div className="mb-5">
      <LineChart
        width={500}
        height={270}
        data={lineData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          domain={[20, 35]}
          orientation="left"
          stroke="red"
        />
        <YAxis
          yAxisId="right"
          domain={[60, 80]}
          orientation="right"
          stroke="blue"
        />

        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temp"
          stroke="red"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="blue"
          dot={false}
        />
        <text
          x={250}
          y={20}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={16}
        >
          Temp and Humidity last 24h.
        </text>
      </LineChart>
    </div>
  );
}
