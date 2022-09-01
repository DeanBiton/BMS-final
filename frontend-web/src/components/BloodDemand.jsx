import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';
import "../pages/Event";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 
export default function ResponsiveStack({formData, handleChange}) {

    const itemElements = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((name) => {
        return (
            <div>
              <Item key={name}> 
                <h3>{name}</h3>
                <Input name={name} type='number' value={formData[name]} onChange={handleChange}></Input>
              </Item>   
            </div>
        )
    })
  return (
      <Stack
        id="bloodStack"
        direction="row"
        spacing={{ xs: 2}}
        >
        {itemElements}

      </Stack>
  );
}