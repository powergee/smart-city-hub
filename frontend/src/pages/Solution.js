import React, { useState } from "react";
import "./Solution.scss";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import SolutionNavigationBar from "../components/SolutionNavigationBar";
import SolutionTable from "../components/SolutionTable";
import CompanyView from "../components/CompanyView";

import { ContentContainer, ArticleEditor } from "../components";
import getToken from "../shared/GetToken";
import { Grid, Button, TextField } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

import CompaniesJson from "../solution-data/companies.json";
import CompanyLogos from "../solution-data/CompanyLogos";
import SolutionImages from "../solution-data/SolutionImages";

function SolutionTableSection(props) {
  const { main, middle } = useParams();
  const companies = [];

  for (let i = 0; i < CompaniesJson.length; i++) {
    for (let j = 0; j < CompaniesJson[i].solutions.length; j++) {
      if (
        CompaniesJson[i].solutions[j].mainCategory === main &&
        CompaniesJson[i].solutions[j].middleCategories === middle
      ) {
        companies.push({ ...CompaniesJson[i], absoluteIndex: i });
        break;
      }
    }
  }

  return <SolutionTable data={companies} />;
}

function SolutionMainSection(props) {
  const main = 0;
  const middle = 0;
  const companies = [];

  for (let i = 0; i < CompaniesJson.length; i++) {
    for (let j = 0; j < CompaniesJson[i].solutions.length; j++) {
      if (
        CompaniesJson[i].solutions[j].mainCategory === main &&
        CompaniesJson[i].solutions[j].middleCategories === middle
      ) {
        companies.push({ ...CompaniesJson[i], absoluteIndex: i });
        break;
      }
    }
  }

  return <SolutionTable data={companies} />;
}

function CompanyEditor(props) {
  const [writerVisible, setWriterVisible] = useState(false);
  const [cookies] = useCookies();
  const { register, handleSubmit, setValue, watch } = useForm();

  const userPayload = getToken(cookies);

  if (!userPayload?.isManager) {
    // 관리자 권한이 없을 시 해당 컴포넌트를 반환하지 않는다.
    return null;
  }

  // base64로 인코딩 된 로고 이미지
  const logoImage = watch("logoImage");

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        setValue("logoImage", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Create />}
        onClick={() => setWriterVisible(!writerVisible)}
      >
        {writerVisible ? "새 회사 등록 취소" : "새 회사 등록"}
      </Button>
      {writerVisible && (
        <form className="company-editor" onSubmit={handleSubmit(onSubmit)}>
          <h2>회사 기본 정보</h2>
          <Grid container>
            <Grid item xs={6}>
              <img className="company-logo" alt="회사 로고" src={logoImage} />
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="이름" {...register("name")} fullWidth />
              <TextField label="영문 이름" {...register("nameEng")} fullWidth />
              <TextField
                label="대표"
                {...register("representative")}
                fullWidth
              />
              <TextField label="주소" {...register("location")} fullWidth />
              <TextField
                label="요약/간단 설명"
                {...register("summary")}
                fullWidth
              />
              <TextField label="웹사이트" {...register("website")} fullWidth />
              <TextField label="연락처" {...register("contact")} fullWidth />
            </Grid>
          </Grid>
          <h2>회사 상세 설명</h2>
          <ArticleEditor />
          <Button type="submit" variant="contained" color="secondary">
            동록
          </Button>
        </form>
      )}
    </>
  );
}

function CompanyViewSection(props) {
  const { companyIdx } = useParams();
  const companyData = CompaniesJson[companyIdx];
  const companyLogo = CompanyLogos[companyIdx];
  const SolImgs = SolutionImages[companyIdx];

  return companyData ? (
    <CompanyView data={companyData} logo={companyLogo} solImgs={SolImgs} />
  ) : (
    <div>회사 정보가 없습니다</div>
  );
}

export default function Solution() {
  const { path } = useRouteMatch();

  return (
    <ContentContainer
      currentPath="/solution"
      title="스마트도시 솔루션"
      subtitle="Smart City Solution"
      description="원하는 솔루션을 보유하고 있는 회사를 찾아보세요."
    >
      <CompanyEditor />
      <div className="solution-container">
        <div className="solution-root">
          <div className="content-left">
            <SolutionNavigationBar />
          </div>
          <div className="content-right">
            <Switch>
              <Route exact path={`${path}`} component={SolutionMainSection} />
              <Route
                path={`${path}/list/:main/:middle`}
                component={SolutionTableSection}
              />
              <Route
                path={`${path}/:companyIdx`}
                component={CompanyViewSection}
              />
            </Switch>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
