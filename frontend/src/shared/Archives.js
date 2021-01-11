import scsolutionLogo from "../images/archive-pics/scsolution-logo.png";
import mofaLogo from "../images/archive-pics/mofa-logo.jpg";
import aseanLogo from "../images/archive-pics/asean-logo.png";
import sctodayLogo from "../images/archive-pics/sctoday-logo.jpg";
import econLogo from "../images/archive-pics/econ-logo.png";
import meLogo from "../images/archive-pics/me-logo.jpg";
import mssLogo from "../images/archive-pics/mss-logo.jpg";
import samsdiLogo from "../images/archive-pics/samsdi-logo.png";
import motieLogo from "../images/archive-pics/motie-logo.png";
import koicaLogo from "../images/archive-pics/koica-logo.png";
import busanecoLogo from "../images/archive-pics/busaneco-logo.png";
import lhscLogo from "../images/archive-pics/lhsc-logo.png";
import moisLogo from "../images/archive-pics/mois-logo.jpg";
import mofLogo from "../images/archive-pics/mof-logo.jpg";
import kitaLogo from "../images/archive-pics/kita-logo.png";
import sejongecoLogo from "../images/archive-pics/sejongeco-logo.png";
import daegscLogo from "../images/archive-pics/daegsc-logo.png";
import lgcnsLogo from "../images/archive-pics/lgcns-logo.png";
import scassoLogo from "../images/archive-pics/scasso-logo.jpg";
import msitLogo from "../images/archive-pics/msit-logo.png";
import mcstLogo from "../images/archive-pics/mcst-logo.jpg";
import goyscLogo from "../images/archive-pics/goysc-logo.png";
import sckoreaLogo from "../images/archive-pics/sckorea-logo.png";
import nspLogo from "../images/archive-pics/nsp-logo.png";
import ksmartLogo from "../images/archive-pics/ksmart-logo.jpg";
import bsiLogo from "../images/archive-pics/bsi-logo.png";
import molitLogo from "../images/archive-pics/molit-logo.jpg";
import pregloLogo from "../images/archive-pics/preglo-logo.png";
import inchscLogo from "../images/archive-pics/inchsc-logo.jpg";

export default function getArchives() {
    return {
        goverment: [
            {
                link: "https://www.msit.go.kr",
                image: msitLogo,
                title: "과학기술정보통신부"
            },
            {
                link: "http://www.molit.go.kr",
                image: molitLogo,
                title: "국토교통부"
            },
            {
                link: "https://www.mcst.go.kr",
                image: mcstLogo,
                title: "문화체육관광부"
            },
            {
                link: "http://www.motie.go.kr",
                image: motieLogo,
                title: "산업통상자원부"
            },
            {
                link: "https://www.mss.go.kr",
                image: mssLogo,
                title: "중소벤처기업부"
            },
            {
                link: "http://www.mofa.go.kr",
                image: mofaLogo,
                title: "외교부"
            },
            {
                link: "http://me.go.kr",
                image: meLogo,
                title: "환경부"
            },
            {
                link: "https://www.mof.go.kr",
                image: mofLogo,
                title: "해양수산부"
            },
            {
                link: "https://www.mois.go.kr",
                image: moisLogo,
                title: "행정안전부"
            },
        ],
        newSouthern: [
            {
                link: "https://asean.org/asean/asean-smart-cities-network/",
                image: aseanLogo,
                title: "ASEAN Smart Cities Network"
            },
            {
                link: "http://www.nsp.go.kr/",
                image: nspLogo,
                title: "신남방정책특별위원회"
            },
            {
                link: "https://shinnambang-economy.co.kr/",
                image: econLogo,
                title: "신남방 경제 연구회"
            },
            {
                link: "http://president.globalwindow.org/kz.southBiz.SBInfo.do",
                image: pregloLogo,
                title: "신남방 비즈니스데스크"
            },
            {
                link: "https://www.kita.net/",
                image: kitaLogo,
                title: "한국무역협회"
            },
            {
                link: "http://koica.go.kr",
                image: koicaLogo,
                title: "한국국제협력단"
            },
        ],
        smartCity: [
            {
                link: "https://smartcity.go.kr/",
                image: sckoreaLogo,
                title: "스마트시티 종합포털"
            },
            {
                link: "https://www.smartcity.or.kr/",
                image: scassoLogo,
                title: "스마트도시협회"
            },
            {
                link: "http://www.k-smartcity.kr",
                image: ksmartLogo,
                title: "글로벌 스마트시티"
            },
            {
                link: "https://smartcitytoday.co.kr",
                image: sctodayLogo,
                title: "스마트시티 투데이"
            },
            {
                link: "http://www.ismartcity.co.kr",
                image: inchscLogo,
                title: "인천스마트시티"
            },
            {
                link: "https://www.smartcitygoyang.kr",
                image: goyscLogo,
                title: "고양스마트시티"
            },
            {
                link: "https://smartdaegu.kr",
                image: daegscLogo,
                title: "대구스마트시티지원센터"
            },
            {
                link: "http://smartcitysolutionmarket.com",
                image: scsolutionLogo,
                title: "스마트시티 솔루션마켓"
            },
            {
                link: "https://busan.ecodelta-smartcity.kr",
                image: busanecoLogo,
                title: "스마트시티 부산 국가시범도시"
            },
            {
                link: "https://www.smartsejong5-1.kr",
                image: sejongecoLogo,
                title: "스마트시티 세종 국가시범도시"
            },
            {
                link: "https://www.lh.or.kr/contents/cont.do?sCode=user&mPid=175&mId=177&menuYear=",
                image: lhscLogo,
                title: "LH 스마트시티"
            },
            {
                link: "https://www.bsigroup.com/ko-KR/smart_cities/Smartcitystdandpublications/",
                image: bsiLogo,
                title: "스마트시티 표준과 관련 자료"
            },
            {
                link: "https://www.lgcns.com/Platform/SmartCity-Cityhub",
                image: lgcnsLogo,
                title: "LG CNS 스마트시티"
            },
            {
                link: "https://www.samsungsdi.co.kr/column/culture/detail/7.html",
                image: samsdiLogo,
                title: "삼성 SDI 스마트시티"
            },
        ]
    };
}