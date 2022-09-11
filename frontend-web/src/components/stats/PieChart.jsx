import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,Cell } from 'recharts';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function BasicPieChart({dataFirst, dataSecond}){

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
      
return(
  <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
  <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

  <div className='stat'>

  <PieChart width={1000} height={400} >
    
    <Legend
    verticalAlign='top'
  payload={
    dataFirst.map(
      (item, index) => ({
        id: item.name,
        type: "square",
        value: `${item.name}`,
        color: COLORS[index % COLORS.length]
      })
    )
  }
/>
        <text x={250} y={240} textAnchor="middle" dominantBaseline="middle">
            Demand
        </text>
      <Pie
        dataKey="value"
        data={dataFirst}
        cx={250}
        cy={200}
        innerRadius={80}
        outerRadius={120}
        fill="#82ca9d"
        label={renderCustomizedLabel}
        labelLine={false}
        >
        {dataFirst.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <text x={700} y={240} textAnchor="middle" dominantBaseline="middle">
    Donated
   </text>
      <Pie
      
      dataKey="value"
      data={dataSecond}
      cx={700}
      cy={200}
      innerRadius={80}
      outerRadius={120}
      fill="#82ca9d"
      label={renderCustomizedLabel}
      labelLine={false}
      >
      {dataSecond.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
      <Tooltip />
    </PieChart>
    </div>
    </Paper>
    </Container>

)
}
export default BasicPieChart