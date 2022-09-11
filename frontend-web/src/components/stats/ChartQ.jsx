// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
const data = [


  {
    date: "2000-04",
    uv: 2780,
    pv: 3908,
  },
  {
    date: "2000-05",
    uv: 1890,
    pv: 4800,
  },
  {
    date: "2000-06",
    uv: 2390,
    pv: 3800,
  },
  {
    date: "2000-07",
    uv: 3490,
    pv: 4300,
  },
  {
    date: "2000-08",
    uv: 4000,
    pv: 2400,
  },
  {
    date: "2000-09",
    uv: 3000,
    pv: 1398,
  },
  {
    date: "2000-10",
    uv: 2000,
    pv: 9800,
  },

];
 console.log(data)

const monthTickFormatter = (tick) => {
  const date = new Date(tick);

  return date.getMonth() + 1;
};

const renderQuarterTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;

  if (month % 3 === 1) {
    return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return null;
};

export default function App({data}) {
    
  return (

    <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
 
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        interval={0}
        tick={renderQuarterTick}
        height={1}
        scale="band"
        xAxisId="quarter"
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="demand" fill="#8884d8" />
      <Bar dataKey="donate" fill="#82ca9d" />
    </BarChart>

    </Paper>
    </Container>
  );
}
