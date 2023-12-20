import React, { useEffect, useState } from "react";
import newsService from "../../../services/news";
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

export default function AllNews() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetchNews(rowsPerPage, offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, rowsPerPage]);

  const fetchNews = async (limit, offset) => {
    try {
      const res = await newsService.getNews(instanceToken.token, limit, offset);
      parse(res.data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const parse = (data) => {
    setNews(data.news);
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

  if (!news) {
    return <em>Loading...</em>;
  }

  return (
    <>
      <div role="presentation" style={{ marginBlockEnd: "10px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <span>News Post</span>
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
          onClick={() => navigate("/createNews")}
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
              <TableCell>Paragraph</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((row) => (
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
                    to={`/news/${row.id}`}
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
