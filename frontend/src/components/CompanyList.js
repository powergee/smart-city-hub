import React, { useState, useEffect } from 'react';
import { Paper, TableContainer, Table, TableBody, TablePagination, TableHead, TableCell, TableSortLabel, TableRow, IconButton, Collapse, Box, Typography, Grid, ButtonBase } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HubJson from "../hub-data/generated/domestic-parsed.json"
import "./CompanyList.scss"

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
                                
                                <th>{headCell.label}</th>
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

const CollapsibleRow = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="추가 정보 보기" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell><th>{row.number}</th></TableCell>
                <TableCell>
                    <ButtonBase onClick={() => window.open(row.site)}>
                        <th className="comp-name">{row.name}</th>
                    </ButtonBase>
                </TableCell>
                <TableCell><th>{row.kind}</th></TableCell>
                <TableCell><th>{row.service}</th></TableCell>
                <TableCell><th>{row.product}</th></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Grid container direction="row">
                                <Typography variant="h6" gutterBottom component="div">
                                    추가 정보
                                </Typography>
                            </Grid>
                            <Table size="small" aria-label="추가 정보">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><th>보유기술</th></TableCell>
                                        <TableCell><th>전화번호</th></TableCell>
                                        <TableCell colSpan="2"><th>주소</th></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{row.tech}</TableCell>
                                        <TableCell>{row.call}</TableCell>
                                        <TableCell colSpan="2">{row.address}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><th>설립연도</th></TableCell>
                                        <TableCell><th>자본금(원)</th></TableCell>
                                        <TableCell><th>회사 매출 규모(원)</th></TableCell>
                                        <TableCell><th>종업원수</th></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{row.found}</TableCell>
                                        <TableCell>{numberWithCommas(row.fund)}</TableCell>
                                        <TableCell>{numberWithCommas(row.sales)}</TableCell>
                                        <TableCell>{numberWithCommas(row.employees)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CompanyList(props) {
    const { firstIndex, secondIndex, thirdIndex } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState("asc");
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState(undefined);

    useEffect(() => {
        // DFS에 기반함.
        function processAllLeafNodes(node, rows) {
            if (node.next) {
                Object.entries(node.next).forEach(([_, nextNode]) => processAllLeafNodes(nextNode, rows));
            }

            if (node.values) {
                node.values.forEach((value) => rows.push({
                    first: value["대분류"],
                    second: value["중분류"],
                    third: value["소분류(키워드)"],
                    name: value["관련기업"],
                    kind: value["회사구분"],
                    service: value["서비스유형"].join(', '),
                    product: value["제품형태(최종제품)"].join(', '),
                    tech: value["보유기술"],
                    call: value["전화번호"],
                    address: value["주소"],
                    site: value["홈페이지"],
                    found: value["설립연도"],
                    fund: value["자본금(원)"],
                    sales: value["회사 매출 규모(원)"],
                    employees: value["종업원수"]
                }));
            }
        }

        const newRows = [];
        const newHeadCells = [];
        let currentNode = HubJson.tree;

        const cateList = [HubJson.firstCate, HubJson.secondCate, HubJson.thirdCate];
        const indexList = [firstIndex, secondIndex, thirdIndex];
        for (let i = 0; i < 3; ++i) {
            if (indexList[i]) {
                const cateName = cateList[i][indexList[i]];
                currentNode = currentNode.next[cateName];
            } else {
                break;
            }
        }

        Array.prototype.push.apply(newHeadCells, [
            {
                id: "button",
                label: "",
                allowSorting: false
            },
            {
                id: "number",
                label: "번호",
                allowSorting: true
            },
            {
                id: "name",
                label: "기업명",
                allowSorting: true
            },
            {
                id: "kind",
                label: "회사구분",
                allowSorting: true
            },
            {
                id: "service",
                label: "서비스유형",
                allowSorting: true
            },
            {
                id: "product",
                label: "제품형태",
                allowSorting: true
            }
        ]);

        processAllLeafNodes(currentNode, newRows);
        newRows.forEach((row, index) => {
            row.number = newRows.length - index;
        });
        setRows(newRows);
        setHeadCells(newHeadCells);
    }, [firstIndex, secondIndex, thirdIndex]);

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
        headCells ? (
            <Paper variant="outlined">
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
                                <CollapsibleRow row={row}></CollapsibleRow>
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
        ) : (
            <div className="comp-loading">
                <h2>데이터를 불러오는 중입니다!</h2>
            </div>
        )
    )
}