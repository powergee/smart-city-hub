import "./SolutionManager.scss";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
import {
  getSolutionCompany,
  getSolutionByCompanyId,
  getSolutionById,
} from "../shared/BackendRequests";

function CustomTextField(props) {
  const { label, name } = props;
  const { register } = useFormContext();

  return (
    <FormControl fullWidth className="custom-text-field">
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
  const form = useForm({
    defaultValues: { ...defaultValues }, // 이외의 간단한 필드들
  });

  useEffect(() => {
    if (!detailEditor) return; // CKEditor 준비가 안 되면 바로 빠져나오기

    if (!data) {
      // data가 없거나 null일 경우, 빈 값으로 모두 초기화
      form.reset({ ...defaultValues });
      detailEditor.setData("");
      setLogoImage("");
    } else {
      // data가 주어진 경우, 이에 맞게 여러 Component 채워 넣기
      form.reset({ ...data });
      detailEditor.setData(data.detail || "");
      setLogoImage(data.logo);
    }
  }, [data, detailEditor, defaultValues, form]);

  return (
    <FormProvider {...form}>
      <form
        className="solution-company-editor"
        onSubmit={form.handleSubmit(async (formData) => {
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
    </FormProvider>
  );
}

function CompanyList(props) {
  const { onClick, target, companies } = props;

  const getClickHandler = (e) => {
    return () => {
      if (typeof onClick === "function") {
        onClick(e);
      }
    };
  };

  return (
    <div className="company-list">
      <List component="div">
        <ListItem
          dense
          button
          selected={target === null}
          onClick={getClickHandler(null)}
        >
          <ListItemText primary="새 회사" />
        </ListItem>
      </List>
      <Divider />
      <List component="div">
        {companies &&
          companies.map((company) => (
            <ListItem
              dense
              button
              selected={company._id === target?._id}
              onClick={getClickHandler(company)}
              key={company._id}
            >
              <ListItemText primary={company.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}

function SolutionEditor(props) {
  const { data, companyId, onSubmit, onDeleteClick } = props;

  const [detailEditor, setDetailEditor] = useState(null);
  const [categoryTag, setCategoryTag] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const defaultValues = useMemo(
    () => ({
      title: "",
      summary: "",
    }),
    []
  );

  const form = useForm({ defaultValues: { ...defaultValues } });

  useEffect(() => {
    if (!detailEditor) return;

    if (!data) {
      form.reset({ ...defaultValues });
      detailEditor.setData("");
      setCategoryTag([]);
      setMainImage("");
    } else {
      form.reset({ ...data });
      detailEditor.setData(data.detail || "");
      setCategoryTag(data.categoryTag);
      setMainImage(data.mainImage);
    }
  }, [data, detailEditor, defaultValues, form]);

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
            mainImage,
          };

          if (typeof onSubmit === "function") {
            await onSubmit(solution);
          }
        })}
      >
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <h3>솔루션 기본 정보</h3>
            <CustomTextField name="title" label="제목" />
            <CustomTextField name="summary" label="요약" />
            <img
              className="solution-main"
              alt="솔루션 대표 이미지"
              src={mainImage}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = function () {
                    setMainImage(reader.result);
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
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
              value={categoryTag}
              onChange={(e) => setCategoryTag(e)}
            />
          </Grid>
        </Grid>
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
    </FormProvider>
  );
}

function SolutionList(props) {
  const { onClick, target, solutions } = props;

  const getClickHandler = (e) => {
    return () => {
      if (typeof onClick === "function") {
        onClick(e);
      }
    };
  };

  return (
    <div className="solution-list">
      <List component="div">
        <ListItem
          dense
          button
          selected={target === null}
          onClick={getClickHandler(null)}
        >
          <ListItemText primary="새 솔루션" />
        </ListItem>
      </List>
      <Divider />
      <List component="div">
        {solutions &&
          solutions.map((solution) => (
            <ListItem
              dense
              button
              selected={solution._id === target?._id}
              onClick={getClickHandler(solution)}
              key={solution._id}
            >
              <ListItemText primary={solution.title} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default function SolutionManager() {
  const [companies, setCompanies] = useState([]);
  const [targetCompany, setTargetCompany] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [targetSolution, setTargetSolution] = useState(null);

  const companyPaperRef = useRef();
  const solutionPaperRef = useRef();

  useEffect(() => {
    // 회사 리스트 가져오기
    getSolutionCompany().then((data) => setCompanies(data));

    if (targetCompany) {
      // 솔루션 리스트 가져오기
      getSolutionByCompanyId(targetCompany._id).then((data) => {
        setSolutions(data);
      });

      if (targetSolution) {
        if (targetSolution.companyId !== targetCompany._id) {
          setTargetSolution(null);
        }
      }
    }
  }, [targetCompany, targetSolution]);

  function scrollToTargetAdjusted(ref) {
    const element = ref.current;
    const headerOffset = 150;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  return (
    <div className="solution-manager">
      <h1>스마트도시 솔루션 관리 페이지</h1>

      <Grid container spacing={3}>
        {/* 왼쪽 사이드바: 솔루션 회사 리스트 및 선택한 회사에 따른 솔루션 리스트 */}
        <Grid item xs={3} className="sidebar-left">
          <Paper>
            <CompanyList
              onClick={async (company) => {
                if (company) {
                  const data = await getSolutionCompany(company._id);
                  setTargetCompany(data);
                } else {
                  setTargetCompany(null);
                }
                scrollToTargetAdjusted(companyPaperRef);
              }}
              companies={companies}
              target={targetCompany}
            />
          </Paper>
          {targetCompany && (
            <Paper style={{ marginTop: "16px" }}>
              <SolutionList
                onClick={async (solution) => {
                  if (solution) {
                    const data = await getSolutionById(solution._id);
                    setTargetSolution(data);
                  } else {
                    setTargetSolution(null);
                  }
                  scrollToTargetAdjusted(solutionPaperRef);
                }}
                solutions={solutions}
                target={targetSolution}
              />
            </Paper>
          )}
        </Grid>
        {/* 오른쪽 사이드바: 솔루션 회사 및 솔루션 생성/편집/삭제 */}
        <Grid item xs={9} className="sidebar-right">
          <Paper ref={companyPaperRef}>
            <SolutionCompanyEditor
              data={targetCompany}
              onSubmit={async (company) => {
                if (window.confirm("정말로 해당 요청을 보내겠습니까?")) {
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
                if (window.confirm("정말로 삭제하겠습니까?")) {
                  try {
                    await axios.delete(
                      `/v1/solutions/companies/${company._id}`
                    );
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
            <Paper ref={solutionPaperRef}>
              <SolutionEditor
                data={targetSolution}
                companyId={targetCompany._id}
                onSubmit={async (solution) => {
                  if (window.confirm("정말로 해당 요청을 보내겠습니까?")) {
                    try {
                      const res = await axios.post(`/v1/solutions`, solution);
                      setTargetSolution(res.data);
                      window.alert("성공");
                    } catch (err) {
                      window.alert(err.message);
                    }
                  }
                }}
                onDeleteClick={async (solution) => {
                  if (window.confirm("정말로 삭제하겠습니까?")) {
                    try {
                      await axios.delete(`/v1/solutions/${solution._id}`);
                      setTargetSolution(null);
                      window.alert("성공");
                    } catch (err) {
                      window.alert(err.message);
                    }
                  }
                }}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
