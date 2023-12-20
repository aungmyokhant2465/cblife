import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import knowledgeService from "../../../services/knowledges";
import uploadService from "../../../services/upload";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Breadcrumbs,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import RichTextEditor from "react-rte";
import { instanceToken } from "../../../utils/constant";

const imgFileTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml"];
const toolbarConfig = {
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "LINK_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS",
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
  ],
};

const UpdateKnowledge = ({ homeAlert }) => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);

  const [values, setValues] = useState({
    title: "",
    paragraph: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [textValue, setTextValue] = useState(RichTextEditor.createEmptyValue());
  const [knowledge, setknowledge] = useState(null);
  const [oldImageName, setOldImageName] = useState(null);

  useEffect(() => {
    if (!knowledge) {
      fetchknowledge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (knowledge) {
      setValues({
        title: knowledge.title ?? "",
        image: knowledge.image ?? "",
        paragraph: knowledge.paragraph ?? "",
      });
      setTextValue(
        RichTextEditor.createValueFromString(knowledge.paragraph, "html")
      );
      setPreview(knowledge.image);
      if (knowledge.image) {
        setOldImageName(
          knowledge.image.substring(
            knowledge.image.lastIndexOf("/") + 1,
            knowledge.image.lenght
          )
        );
      }
    }
  }, [knowledge]);

  const fetchknowledge = async () => {
    try {
      const res = await knowledgeService.getKnowledge(instanceToken.token, id);
      setknowledge(res.data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeText = (value) => {
    setTextValue(value);
    setValues({ ...values, paragraph: value.toString("html") });
  };

  const imgFileSelect = async (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files && e.target.files[0]) {
        const img = e.target.files[0];
        if (!imgFileTypes.includes(img.type)) {
          setErrors({
            ...errors,
            profile: "Please select image. (PNG, JPG, JPEG, GIF, ...)",
          });
          return;
        }
        if (img.size > 10485760) {
          setErrors({
            ...errors,
            profile: "Image file size must be smaller than 10MB.",
          });
          return;
        }
        setPreview(URL.createObjectURL(img));
        setImageFile(img);
        setIsImageChange(true);
      }
    }
  };

  const handleImgUpload = async (url, imageFile) => {
    try {
      await uploadService.uploadImage(url, imageFile);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImageUrl = async () => {
    try {
      const res = await uploadService.getImageUrl(instanceToken.token);
      if (res.data) {
        return {
          url: res.data.imageUploadUrl,
          name: `https://axra.sgp1.digitaloceanspaces.com/CBLife/${res.data.imageName}`,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = async (fileName) => {
    try {
      await uploadService.deleteImage(instanceToken.token, {
        imageName: fileName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    setErrors({});
    let err = {};
    if (!values.title) {
      err.title = "Title field is required";
    }
    if (!values.paragraph) {
      err.paragraph = "Paragraph field is required";
    }
    if (Object.getOwnPropertyNames(err).length > 0) {
      setErrors({ ...err });
      return;
    }
    try {
      setLoading(true);
      let data = values;

      if (isImageChange) {
        if (oldImageName) {
          await deleteImage(oldImageName);
        }

        const img = imageFile;
        const { url, name } = await fetchImageUrl();
        await handleImgUpload(url, img);
        data = { ...data, image: name };
      } else {
        data = { ...data, image: knowledge.image };
      }

      const response = await knowledgeService.putKnowledge(
        instanceToken.token,
        id,
        data
      );
      setknowledge(response.data);
      homeAlert("knowledge Post have been updated.", false);
    } catch (error) {
      console.log(error);
      homeAlert("Error on server.", true);
    } finally {
      setLoading(false);
      setErrors({});
    }
  };

  return (
    <>
      <div role="presentation" style={{ marginBlockEnd: "10px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/knowledges">Knowledges</Link>
          <Link to={`/knowledges/${id}`}>Knowledge (ID - {id})</Link>
          <span>Update</span>
        </Breadcrumbs>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ minWidth: "80vw" }}>
          <CardContent sx={{ display: "flex", pb: 0 }}>
            <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="320"
                image={preview}
                sx={{ my: 2 }}
              />
              <FormControl sx={{ my: 2 }} variant="outlined">
                <TextField
                  id="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange("title")}
                  error={errors.title ? true : false}
                  helperText={errors.title}
                />
              </FormControl>
              <FormControl sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  size="large"
                  sx={{ p: 2 }}
                >
                  <PhotoCamera />
                  <Typography sx={{ ml: 1 }}>Upload Image</Typography>
                  <input
                    hidden
                    onChange={imgFileSelect}
                    accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
                    type="file"
                  />
                </Button>
              </FormControl>
            </Box>
            <Box sx={{ flex: 3, mt: 2, ml: 2 }}>
              <Box>
                <RichTextEditor
                  style={{ overflow: "scroll", height: "100%" }}
                  value={textValue}
                  onChange={handleChangeText}
                  toolbarConfig={toolbarConfig}
                  placeholder="Paragraph"
                />
                {errors.paragraph && (
                  <FormHelperText error>{errors.paragraph}</FormHelperText>
                )}
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleUpdate}
              sx={{ backgroundColor: "#4b26d1", alignSelf: "end" }}
            >
              Update
            </LoadingButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default UpdateKnowledge;
