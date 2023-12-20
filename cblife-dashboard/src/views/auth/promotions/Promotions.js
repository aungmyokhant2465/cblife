import React, { useEffect, useState } from "react";
import promotionService from "../../../services/promotions";
import { instanceToken } from "../../../utils/constant";

import {
  TablePagination,
  Breadcrumbs,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Promotions() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [promotions, setpromotions] = useState(null);

  useEffect(() => {
    fetchPromotions(rowsPerPage, offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, rowsPerPage]);

  const fetchPromotions = async (limit, offset) => {
    try {
      const res = await promotionService.getPromotions(
        instanceToken.token,
        limit,
        offset
      );
      parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const parse = (data) => {
    setpromotions(data.promotions);
    setCount(data.count);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setOffset(rowsPerPage * newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!promotions) {
    return <em>Loading...</em>;
  }

  return (
    <>
      <div role="presentation" style={{ marginBlockEnd: "10px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <span>Promotions</span>
        </Breadcrumbs>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          sx={{ my: 3 }}
          variant="contained"
          onClick={() => navigate("/createPromotion")}
        >
          Create
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Pargaraph</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {"..." + row.paragraph?.substring(10, 40) + "..."}
                </TableCell>
                <TableCell>{row?.createdAt.substring(0, 10)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    component={Link}
                    color="secondary"
                    to={`/promotions/${row.id}`}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
