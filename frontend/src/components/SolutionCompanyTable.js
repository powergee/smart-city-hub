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
            <TableCell>회사 이름</TableCell>
            <TableCell>요약</TableCell>
            <TableCell>총 보유 솔루션 개수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item.company.name}>
                <TableCell>
                  <a
                    href={href && href(item.company._id)}
                    onClick={(e) => {
                      e.preventDefault();

                      if (typeof onClick === "function") {
                        onClick(item);
                      }
                    }}
                  >
                    {item.company.name}
                  </a>
                </TableCell>
                <TableCell>{item.company.summary}</TableCell>
                <TableCell>{item.solutions.length}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
