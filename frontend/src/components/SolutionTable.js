import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

export default function SolutionTable(props) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>기업명</TableCell>
            <TableCell>솔루션 개수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((comp, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link to={`/solution/${comp.absoluteIndex}`}>{comp.name}</Link>
              </TableCell>
              <TableCell>{comp.solutions.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
