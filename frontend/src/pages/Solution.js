import React from "react";
import companyLogo from "./한화테크원로고.png";
import companyImg from "./getImage.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { ContentContainer } from "../components";

const makeListItemStyles = (styles) => {
  return makeStyles((theme) => ({
    listItemText: styles,
  }));
};

function CustomListItemText(props) {
  const { primary, secondary } = props;
  const primaryClasses = makeListItemStyles({ fontSize: "1.5rem" })();
  const secondaryClasses = makeListItemStyles({ fontSize: "1rem" })();

  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      classes={{
        primary: primaryClasses.listItemText,
        secondary: secondaryClasses.listItemText,
      }}
    />
  );
}

function SolutionBody(props) {
  const data = props.data;

  return (
    <Grid container>
      <Grid item xs={8}>
        <List>
          <ListItem>
            <CustomListItemText
              primary="회사명"
              secondary={data.solutionCompany}
            />
            <img src={companyLogo} alt="Company Logo" />
          </ListItem>
          <ListItem>
            <CustomListItemText
              primary="담당자연락처"
              secondary={data.companyTel}
            />
          </ListItem>
          <ListItem>
            <CustomListItemText
              primary="홈페이지"
              secondary="https://product.hanwha-security.com/ko/products/camera/network/"
            />
          </ListItem>
          <ListItem>
            <CustomListItemText
              primary="솔루션 소개"
              secondary={data.solutionIntro}
            />
          </ListItem>
          <ListItem>
            <CustomListItemText
              primary="솔루션 특징"
              secondary={
                <div
                  dangerouslySetInnerHTML={{ __html: data.solutionContentHTML }}
                ></div>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={4}>
        <img src={companyImg} alt="Company Image" style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
}

export default function Solution() {
  const exampleData1 = {
    solutionTitle: "CCTV 관제용 VMS 솔루션(SSM)",
    solutionCompany: "한화테크윈(주)",
    companyTel: "1588-5772",
    companyContent:
      "한화테크윈은 광학, 칩셋 분야 핵심 기술을 기반으로 카메라, 저장장치, 통합관리 소프트웨어를 포함한 Total Security Solution을 제공하고 있습니다. 한회테크윈은 1991년 보안 카메라 출시를 시작으로 약 30여년간 영상보안 사업에 집중하여 세계 최고 수준의 광학 설계 및 영상 처리 기술을 축적해 왔습니다. 끊임없는 기술 개발과 시장 개척을 통해 국내 영상 보안 시장 점유율 1위를 유지하고 있으며, 글로벌 시장에서도 16,000개 이상의 네트워크를 구축, 전체 매출의 75%를 해외에서 거두며 활발한 영업ㆍ마케팅 활동을 펼치고 있습니다.",
    solutionIntro: "한화테크윈 CCTV 시스템의 통합 관제를 위한 VMS 솔루션",
    solutionContentHTML: `
    <p>1)	시스템 기본
    <br>A.	지원포맷     : H.264, H.265, MPEG-4, MJPEG
    <br>B.	해상도         : 지원 장치에 따름
    <br>C.	등록채널수 : 최대 1,024채널(도메인) / 128채널(서버)   * 서버 저장 사용시
    <br>                                최대 10,000채널(도메인)/ 3,000채널(서버)  * NVR/DVR 사용시
    <br>D.	녹화채널수 : 최대 1,024채널(도메인) / 128채널(서버)   * 서버 저장 사용시
    <br>E.	구 조            : 다중 서버 클러스터링 지원 (최대 8개)
    <br>F.	페더레이션 : 지원 (최대 100개 도메인, 4단계 계층 구조 지원)
    <br>G.	모바일뷰어 : 지원 (Wisenet 모바일, 최대 16채널 동시 모니터링/이벤트 검색)
    <br>H.	라이선스     : 45일 평가버젼 제공(모든 기능 사용 가능) 
    <br>         * 기간 만료 후 
    <br>             뷰어 라이선스 적용시 : 16채널 무료 녹화 가능(단일 서버 구성시)
    <br>             채널 라이선스 적용시 : 채널 수에 맞게 녹화 가능(최대 128채널/서버)
    <br>
    <br>2)	오디오
    <br>A.	지원포맷   : G.711 μ-law (PCM), G.723, G.726 (ADPCM), AAC
    <br>B.	기 능          : 양방향 (입/출력)
    <br>
    <br>3)	라이브 모니터링
    <br>A.	모니터링     : 모니터링 1개의 탭 최대 64채널(4개 모니터링 탭 지원하며 최대 100채널)
    <br>         * 탭 기반 윈도우 방식, 4개 모니터링 탭 사용시 각 25채널씩 사용
    <br>B.	분할화면     : 1/ 4/ 8/ 9/ 16/ 17/ 25/ 36/ 49/ 64  * 사용자 정의 레이아웃/패턴 생성 가능
    <br>C.	시퀀스모드 : 지원 (16분할 제한)
    <br>D.	PTZ 제어     : 영역줌(Area), 1배줌 바로가기, 감도/초점/줌/패트롤/스윙/그룹/추적/프리셋/조리개 제어
    <br>E.	맵모니터링 : 맵 레이아웃 분할, 확대/축소, 팝업(인스턴트 뷰어), 맵 위 카메라/알람입출력 표시
    <br>F.	긴급녹화     : 지원 (최대 1시간)
    <br>G.	대시보드     : 지원 (CPU/메모리/네트워크 대역폭/HDD 용량 등)
    <br>
    <br>4)	검색 및 재생
    <br>A.	검 색          : 날짜/이벤트/움직임/스마트/POS(텍스트) 검색 (최대 64채널)
    <br>B.	재 생          : 16채널 동시 재생
    <br>C.	대역폭       : 녹화(400Mbps) / 재생(100Mbps)
    <br>D.	내보내기   : 영상/프라이버시 영상/원타임 스케쥴
    <br>
    <br>5)	이벤트 모니터링
    <br>A.	이벤트검색      : 시스템/카메라/알람입출력, 영상손실/움직임/지나감/들어감/나감/나타남(사라짐)
    <br>                                     탬퍼링/얼굴/오디오
    <br>B.	리포트              : 이벤트 통계(인쇄/엑셀, pdf, 워드)
    <br>C.	히스토리          : 지원 (선택 이벤트 세부정보 확인)
    <br>D.	인스턴트 뷰어 : 라이브 (영상보기, 이벤트 승인, 내용 기록, 이벤트 상태 처리)
    <br>                                     재생 (이벤트 발생채널의 저장 영상 재생)
    <br>E.	이벤트 동작     : 장치이벤트 기반 설정 (타입 : 인스턴트뷰어/프리셋/알람/메세지팝업/사운드/이메일)
    <br>
    <br>6)	구성 관리자
    <br>A.	시스템설정 : 사용자/그룹 관리, 로그, 설정 백업/복원/초기화, 로그인 잠금, 비밀번호 변경, HTTPS
    <br>                                이메일, 스케쥴, 라이선스, 페더레이션, LDAP
    <br>B.	장치설정     : 도메인 관리, SSM 서버설정, 디스크 정보, 저장 설정
    <br>C.	기타설정     : 레이아웃/맵 관리, 사용자패턴 추가, 이벤트 동작, 우선순위 설정
    <br>D.	스마트압축 : 관심 영역 5개지정(ROI), WiseStreamⅡ 지원
    <br>E.	오디오통신 : 양방향
    <br>F.	보안             : HTTPS(SSL), Digest, 802.1X(EAP-TLS, EAP-LEAP)인증, IP주소필터링, 사용자접속로그
    <br>G.	S/W연동    : ONVIF ProfileS/G, SUNAPI 2.0(HTTP API), Wisenet 오픈플랫폼
    <br>H.	ARB            : 지원 (Auto recovery backup)
    <br>
    <br>7)	기타
    <br>A.	지원 언어     : 한국어, 영어 외
    <br>B.	지원 장치     : 한화테크윈 네트워크 카메라/엔코더, NVR/DVR, ONVIF profile S 호환 카메라
    <br>                                컨트롤러 (SPC-2000/7000)
    <br>C.	구성 모듈     : 코어 서버, 콘솔 클라이언트
    <br>D.	시간동기화 : 지원 (NTP 서버)
    <br>
    <br>8)	시스템 요구 사항
    <br>A.	콘솔 클라이언트
    <br>- CPU   : Intel i7-4770@3.40GHz
    <br>- VGA   : Geforce GTX 760 (RAM 2GB)  * CUDA 사용시 Geforce GTX 960 (RAM 2GB)
    <br>- RAM   : 16GB 이상
    <br>- OS      : Windows 서버 2008/2012
    <br>                 Windows 7 / 8/ 8.1 / 10 (64비트)  * 64비트 OS만 지원(32비트 불가)
    <br>- HDD   : 설치시 20GB 여유공간 필요
    <br>B.	코어 서버
    <br>- CPU   : Intel i7-4770@3.40GHz
    <br>- RAM   : 16GB 이상
    <br>- OS      : Windows 서버 2008/2012
    <br>                 Windows 7 / 8/ 8.1 / 10 (64비트)  * 64비트 OS만 지원(32비트 불가)
    <br>- HDD   : SSD (Window OS 시동용)  *설치시 20GB 여유공간 필요
    <br>          * 서버 녹화기능 사용시
    <br>             SATA3 7200RPM(64MB Cache) 4개 이상
    <br>          * RAID 5 (8베이, H/W RAID 컨트롤러)
    <br>          * iSCSI (RAID 사양 포함, NIC 대역폭 1Gbps 이상 2개)</p>`,
  };
  const exampleData2 = {
    solutionTitle: "KT 스마트시티 통합플랫폼",
  };

  return (
    <ContentContainer
      currentPath="/solution"
      title="스마트도시 솔루션"
      description="아래 목록에서 원하시는 솔루션을 선택해주세요."
      subtitle="Smart City Solution"
    >
      <SolutionBody data={exampleData1} />
    </ContentContainer>
  );
}
