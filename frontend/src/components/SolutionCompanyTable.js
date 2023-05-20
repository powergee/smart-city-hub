import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

export default function CompanyTable(props) {
  const { data, href, onClick } = props;

  return (
    <TableContainer className="solution-company-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>요약</TableCell>
            <TableCell>총 보유 솔루션 개수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((company) => (
              <TableRow key={company.name}>
                <TableCell>
                  <a href={href && href(company._id)}>{company.name}</a>
                </TableCell>
                <TableCell>{company.summary}</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
