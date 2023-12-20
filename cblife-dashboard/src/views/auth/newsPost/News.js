import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Grid,
  Box,
  Typography,
  CardContent,
  CardActions,
  Button,
  Breadcrumbs,
  Modal,
  CardMedia,
} from "@mui/material";
import uploadService from "../../../services/upload";
import newsService from "../../../services/news";
import { instanceToken } from "../../../utils/constant";

const styleR = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const News = ({ homeAlert }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [openR, setOpenR] = useState(false);

  useEffect(() => {
    if (!news) {
      fetchNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNews = async () => {
    try {
      const res = await newsService.getOneNews(instanceToken.token, id);
      setNews(res.data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  if (!news) {
    return <em>Loading...</em>;
  }

  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => {
    setOpenR(false);
  };

  const handleRemove = async () => {
    try {
      if (news.image) {
        await uploadService.deleteImage(instanceToken.token, {
          imageName: news.image,
        });
      }
      await newsService.deleteNews(instanceToken.token, news.id);
      homeAlert("News post have been removed.", false);
      navigate("/all_news");
    } catch (error) {
      console.log(error);
      homeAlert("Error on server!", true);
    }
  };

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/all_news">
            All News Post
          </Link>
          <Typography color="text.primary">News (ID - {id})</Typography>
        </Breadcrumbs>
      </div>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Card
          sx={{
            minWidth: "80vw",
            minHeight: "60vh",
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
          }}
        >
          <div>
            <CardMedia component="img" height="320" image={news.image} />
            <CardContent sx={{ pr: 5 }}>
              <Grid sx={{ m: 2 }} container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Title :
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" color="text.secondary">
                    {news.title}
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ m: 2 }} container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Created On :
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" color="text.secondary">
                    {news.createdAt.substring(0, 10)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </div>
          <Box
            sx={{
              ml: 2,
              p: 2,
              bgcolor: "#f7f7f5",
              borderRadius: 2,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: news.paragraph }}></div>
          </Box>

          <CardActions sx={{ gridColumn: "1/3", justifyContent: "end" }}>
            <Button size="small" color="error" onClick={handleOpenR}>
              Remove
            </Button>
            <Button size="small" component={Link} to={`/updateNews/${news.id}`}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Modal
        keepMounted
        open={openR}
        onClose={handleCloseR}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={styleR}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Are you sure want to remove it?
          </Typography>
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button color="secondary" onClick={handleCloseR}>
              Cancel
            </Button>
            <Button onClick={handleRemove}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default News;
