import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';


export default function DenseTable({ options }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell >Filtros</TableCell>
                        <TableCell >Descrição</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {options.map((row) => (
                        <TableRow
                            key={row.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link className="cursor-pointer text-blue hover:text-blue-500" to={`relatorios/${row.path}`}>
                                    {row.title}
                                </Link>

                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.filters}
                            </TableCell>
                            <TableCell >{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
