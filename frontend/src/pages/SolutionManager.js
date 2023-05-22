import React, { useState, useEffect, useMemo } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import axios from "axios";

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@material-ui/core";

import { ArticleEditor, SolutionCategorySelector } from "../components";

import "./SolutionManager.scss";

function CustomTextField(props) {
  const { label, name } = props;
  const { register } = useFormContext();

  return (
    <FormControl fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <Input fullWidth {...register(name)} />
    </FormControl>
  );
}

function SolutionCompanyEditor(props) {
  const { data, onSubmit, onDeleteClick } = props;
  const defaultValues = useMemo(
    () => ({
      name: "",
      nameEng: "",
      representative: "",
      location: "",
      summary: "",
      website: "",
      contact: "",
    }),
    []
  );

  const [detailEditor, setDetailEditor] = useState(null); // 상세 정보를 담는 HTML 편집기 Element
  const [logoImage, setLogoImage] = useState(""); // 로고 이미지의 Base64 형태
  const { register, reset, handleSubmit } = useForm({
    defaultValues: { ...defaultValues }, // 이외의 간단한 필드들
  });

  useEffect(() => {
    if (!detailEditor) return; // CKEditor 준비가 안 되면 바로 빠져나오기

    if (!data) {
      // data가 없거나 null일 경우, 빈 값으로 모두 초기화
      reset({ ...defaultValues });
      detailEditor.setData("");
      setLogoImage("");
    } else {
      // data가 주어진 경우, 이에 맞게 여러 Component 채워 넣기
      reset(data);
      detailEditor.setData(data.detail || "");
      setLogoImage(data.logo);
    }
  }, [data, detailEditor, reset, defaultValues]);

  const CustomTextField = ({ label, name }) => (
    <FormControl fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <Input fullWidth {...register(name)} />
    </FormControl>
  );

  return (
    <form
      className="solution-company-editor"
      onSubmit={handleSubmit(async (formData) => {
        // form data + detail ckeditor data + logo data
        const company = {
          ...formData,
          logo: logoImage,
          detail: detailEditor?.getData(),
        };

        if (typeof onSubmit === "function") {
          // 데이터 가공만 해당 컴포넌트에서 하고, 서버 요청은 전적으로 부모 컴포넌트에게 위임한다.
          await onSubmit(company);
        }
      })}
    >
      <h3>회사 기본 정보</h3>
      <Grid container>
        <Grid item xs={6}>
          <img className="company-logo" alt="회사 로고" src={logoImage} />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];

              if (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                  setLogoImage(reader.result);
                };

                reader.readAsDataURL(file);
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField label="이름" name="name" />
          <CustomTextField label="영문 이름" name="nameEng" />
          <CustomTextField label="대표" name="representative" />
          <CustomTextField label="주소" name="location" />
          <CustomTextField label="요약/간단 설명" name="summary" />
          <CustomTextField label="웹사이트" name="website" />
          <CustomTextField label="연락처" name="contact" />
        </Grid>
      </Grid>
      <h3>회사 상세 설명</h3>
      <ArticleEditor
        onReady={(editor) => {
          setDetailEditor(editor);
        }}
      />
      <Button type="submit" variant="contained" color="secondary">
        등록
      </Button>{" "}
      {data?._id && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={async () => {
            if (typeof onDeleteClick === "function") {
              await onDeleteClick(data);
            }
          }}
        >
          삭제
        </Button>
      )}
    </form>
  );
}

function SolutionCompanyList(props) {
  const { onClick, target } = props;
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      const res = await axios.get("/v1/solutions/companies");
      setCompanies(res.data);
    }

    getCompanies();
  }, [target]);

  return (
    <div>
      <List component="div">
        <ListItem
          dense
          button
          selected={target === null}
          onClick={() => {
            if (typeof onClick === "function") {
              onClick(null);
            }
          }}
        >
          <ListItemText primary="새 회사" />
        </ListItem>
      </List>
      <Divider />
      <List component="div">
        {companies.map((company) => (
          <ListItem
            dense
            button
            selected={company._id === target?._id}
            onClick={() => {
              if (typeof onClick === "function") {
                onClick(company);
              }
            }}
            key={company._id}
          >
            <ListItemText primary={company.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

function SolutionList(props) {
  const { onClick } = props;
  const [target, setTarget] = useState(null);

  return (
    <div>
      <List component="div">
        <ListItem
          dense
          button
          selected={target === null}
          onClick={() => {
            if (typeof onClick === "function") {
              onClick(null);
            }
          }}
        >
          <ListItemText primary="새 솔루션" />
        </ListItem>
      </List>
    </div>
  );
}

function SolutionEditor(props) {
  const { onSubmit, companyId } = props;
  const [detailEditor, setDetailEditor] = useState(null);
  const [categoryTag, setCategoryTag] = useState("");
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form
        className="solution-editor"
        onSubmit={form.handleSubmit(async (formData) => {
          const solution = {
            companyId,
            ...formData,
            categoryTag,
            detail: detailEditor?.getData(),
          };

          if (typeof onSubmit === "function") {
            await onSubmit(solution);
          }
        })}
      >
        <Grid container>
          <Grid item xs={8}>
            <h3>솔루션 기본 정보</h3>
            <CustomTextField name="title" label="제목" />
            <CustomTextField name="summary" label="요약" />
            <h3>솔루션 상세 정보</h3>
            <ArticleEditor
              onReady={(editor) => {
                setDetailEditor(editor);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <SolutionCategorySelector
              className="category-selector"
              onChange={(categories) =>
                setCategoryTag(
                  Object.keys(categories)
                    .filter((key) => categories[key])
                    .join(",")
                )
              }
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="secondary">
          등록
        </Button>
      </form>
    </FormProvider>
  );
}

export default function SolutionCompanyManager() {
  const [targetCompany, setTargetCompany] = useState(null);
  const [targetSolution, setTargetSolution] = useState(null);

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper>
          <SolutionCompanyList
            onClick={async (company) => {
              if (company) {
                const res = await axios.get(
                  `/v1/solutions/companies/${company._id}`
                );
                setTargetCompany(res.data);
              } else {
                setTargetCompany(null);
              }
            }}
            target={targetCompany}
          />
        </Paper>
        <Paper style={{ marginTop: "16px" }}>
          <SolutionList target={targetSolution} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper style={{ padding: "24px" }}>
          <SolutionCompanyEditor
            data={targetCompany}
            onSubmit={async (company) => {
              if (
                window.confirm(
                  `정말로 ${company.name} 회사를 ${
                    company._id ? "수정" : "등록"
                  }하겠습니까?`
                )
              ) {
                try {
                  const res = await axios.post(
                    "/v1/solutions/companies",
                    company
                  );
                  setTargetCompany(res.data);
                  window.alert("성공");
                } catch (err) {
                  window.alert(err);
                }
              }
            }}
            onDeleteClick={async (company) => {
              if (
                window.confirm(`정말로 ${company.name} 회사를 삭제하겠습니까?`)
              ) {
                try {
                  await axios.delete(`/v1/solutions/companies/${company._id}`);
                  setTargetCompany(null);
                  window.alert("성공");
                } catch (err) {
                  window.alert(err);
                }
              }
            }}
          />
        </Paper>
        {targetCompany && (
          <Paper style={{ padding: "24px", marginBottom: "24px" }}>
            <SolutionEditor
              companyId={targetCompany._id}
              onSubmit={async (data) => {
                try {
                  const res = await axios.post(`/v1/solutions`, data);
                  setTargetSolution(res.data);
                  window.alert("솔루션 등록에 성공했습니다!");
                } catch (err) {
                  window.alert(err.message);
                  setTargetSolution(null);
                }
              }}
            />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}
