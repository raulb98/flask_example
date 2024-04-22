import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BackendService from "../../Services/Services"
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Button } from '@mui/material';
import GutterlessList from '../Tools/GutterlessList';
import DeleteOrder from './DeleteOrder';

let orders_row = [];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({my_tab}) {
    const [isLoading, setLoading] = React.useState(false);
     
     React.useEffect(() => {
      if(!isLoading)
      {
       const cookie = new Cookies();
       const token = cookie.get("jwt");
       const ak = cookie.get("app_key");
       const permissions = cookie.get("p");
       const name = cookie.get("n");

       const fetchDataRead = async () => {
       try{
            let order_resp;
            if(permissions == 0)
            {
              order_resp = await BackendService.read_orders(ak, "", token);
            }  
            else
            {
              order_resp = await BackendService.read_orders(ak, name, token);
            }
            if(order_resp.status == 200)
            {
              setLoading(true);
              if(orders_row != null)
              {
                orders_row = Object.keys(order_resp.data)
                              .map(key => order_resp.data[key]);
              }
            }
         }catch( error ){ console.log(error); }
         };
         fetchDataRead().then();
      }
   }, [isLoading]);

  
  if(isLoading && (my_tab == 3))
  {
    return (
      <React.Fragment>
        <Title>Orders</Title>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell align="right">Intermediate</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Finished</TableCell>
              <TableCell align="right">Display Order</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
              {
                  orders_row.map((row) => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="right">{row[1]}</TableCell>
                        <TableCell align="right">{row[3]}</TableCell>
                        <TableCell align="right">{row[2]}</TableCell>
                        <TableCell align="right"><GutterlessList data={row[4]}/></TableCell>
                        <DeleteOrder email={row[1]}/>
                    </TableRow>
                    ))
              }
          </TableBody>
        </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}
