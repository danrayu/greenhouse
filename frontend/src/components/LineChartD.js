import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LineChartD(props) {
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
        <YAxis domain={props.domain} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.dataKeyName} stroke="red" dot={false} />
        <text
          x={250}
          y={20}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={16}
        >
          {props.name}
        </text>
      </LineChart>
    </div>
  );
}
