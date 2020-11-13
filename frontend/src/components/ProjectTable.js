import React, { useState } from 'react';
import { Paper, TableContainer, Table, TableBody, TablePagination, TableHead, TableCell, TableSortLabel, TableRow } from '@material-ui/core'

const compareElements = (a, b, orderBy) => {
    if (a[orderBy] < b[orderBy])
        return -1;
    else if (a[orderBy] > b[orderBy])
        return 1;
    else
        return 0;
}

const sortRows = (rows, order, orderBy) => {
    const mappedList = rows.map((element, index) => [element, index]);
    mappedList.sort((a, b) => {
        let compared = compareElements(a[0], b[0], orderBy);
        return order === "asc" ? compared : -compared;
    });
    return mappedList.map((el) => el[0]);
}

const SortableTableHead = (props) => {
    const getSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {props.headCells?.map((headCell) => (
                    <TableCell 
                        key={headCell.id}
                        sortDirection={props.orderBy === headCell.id ? props.order : false}>
                        
                        {headCell.allowSorting ? (
                            <TableSortLabel
                                active={props.orderBy === headCell.id}
                                direction={props.orderBy === headCell.id ? props.order : "asc"}
                                onClick={getSortHandler(headCell.id)}>
                                
                                {headCell.label}
                                {props.orderBy === headCell.id ? (
                                    <span>
                                        {props.order === "desc" ? "(내림차순)" : "(오름차순)"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        ) : headCell.label}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default function ProjectTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [orderBy, setOrderBy] = React.useState('no');
    const [order, setOrder] = React.useState("des");
    const rows = props.rows;

    const headCells = [
        {
            id: "no",
            label: "No.",
            allowSorting: true
        },
        {
            id: "when",
            label: "기간",
            allowSorting: true
        },
        {
            id: "client",
            label: "발주처",
            allowSorting: true
        },
        {
            id: "title",
            label: "사업명",
            allowSorting: true
        }
    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper elevation={3}>
            <TableContainer component={Paper}>
                <Table size="small">
                    <SortableTableHead
                        headCells={headCells}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}/>
                    <TableBody>
                        {sortRows(rows, order, orderBy)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow>
                                    <TableCell>{row.no}</TableCell>
                                    <TableCell>{row.when}</TableCell>
                                    <TableCell>{row.client}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
