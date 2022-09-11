import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function DataComposedChart({headers,data}) {
    return (
      <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey={headers[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={headers[1]} barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey={headers[2]} stroke="#ff7300" />
        <Line type="monotone" dataKey={headers[3]} stroke="#ff1300" />
  
      </ComposedChart>

      </Paper>
    </Container>
    );
  }