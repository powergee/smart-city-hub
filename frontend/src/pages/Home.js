import React, { useState, useEffect } from "react";
import { NoticeBoard, CardBoard, DocumentPreview } from "../components";
import {
  Paper,
  ButtonBase,
  Modal,
  Typography,
  Tooltip,
} from "@material-ui/core";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Fade } from "react-slideshow-image";
import { getArticles, getFileInfo } from "../shared/BackendRequests";
import { dateToString } from "../shared/DateToString";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import kindTable from "../shared/ArticleKindTable.json";
import hubJson from "../hub-data/generated/domestic-parsed.json";
import categoryImage from "../shared/CategoryImage";
import cateToEng from "../hub-data/cateToEng.json";
import getArchives from "../shared/Archives.js";
import countries from "../asean-data/CountryData";
import { useHistory } from "react-router-dom";

import "react-slideshow-image/dist/styles.css";
import "./Home.scss";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const [archOpen, setArchOpen] = useState(false);
  const [imageCards, setImageCards] = useState([]);
  const [issuePaperPreview, setIssuePaperPreview] = useState([]);
  const [archivePreview, setArchivePreview] = useState([]);
  const [hubPreviewRows, setHubPreviewRows] = useState([]);
  const history = useHistory();
  const archMenu = getArchives();

  useEffect(() => {
    updateDocumentPreviews();
    updateHubPreviews();
  }, []);

  function updateDocumentPreviews() {
    function extractSrc(html) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;
      return tempElement.querySelector("img").getAttribute("src");
    }

    function extractVedioUrl(html) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;
      return tempElement.querySelector("iframe").getAttribute("src");
    }

    function getArticlePath(articleId, kind) {
      return `${kindTable[kind].path}/${articleId}`;
    }

    function getLinkHandler(element) {
      return () => {
        history.push(getArticlePath(element.articleId, element.kind));
      };
    }

    function checkExtension(fileName, ext) {
      const target = "." + ext;
      return (
        fileName.substring(Math.max(0, fileName.length - target.length)) ===
        target
      );
    }

    async function hasPDF(article) {
      const promises = [];
      article.files.forEach((fileId) => {
        promises.push(getFileInfo(fileId));
      });

      try {
        const infoArr = await Promise.all(promises);

        let result = false;
        infoArr.some((info) => {
          if (checkExtension(info.originalName, "pdf")) {
            result = true;
          }
          return result;
        });
        return result;
      } catch (e) {
        return false;
      }
    }
    const noticesArticles = getArticles(
      1,
      1,
      "notices",
      /<img.*>/.source,
      undefined,
      undefined
    );
    const newsArticles = getArticles(
      1,
      1,
      "smart-news",
      /<img.*>/.source,
      undefined,
      undefined
    );

    const videoArticles = getArticles(
      1,
      1,
      undefined,
      /(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+/.source,
      undefined,
      undefined
    );

    videoArticles.then((element) => {
      const imCard = [];
      if (element[0]) {
        const vedeoUrl = extractVedioUrl(element[0].contents);
        imCard.push(
          <a
            onClick={() => {
              history.push("/news/notices/" + element[0].articleId);
            }}
          >
            <Paper className="menu-card-video">
              <div
                className="menu-card-video-thumb"
                style={{
                  backgroundImage: `url(http://img.youtube.com/vi/${vedeoUrl.slice(
                    30
                  )}/0.jpg)`,
                }}
              ></div>
              <div className="menu-card-video-overlay">
                <PlayCircleOutlineIcon color="action"></PlayCircleOutlineIcon>
              </div>
              <div className="menu-card-video-bottom">
                <strong>{element[0].title}</strong>
                <span>공지사항 · {element[0].meta.createdAt.slice(0, 10)}</span>
              </div>
            </Paper>
          </a>
        );
      }

      Promise.all([noticesArticles, newsArticles, imageCards]).then((res) => {
        const imgArticles = res[0].concat(res[1]);
        imgArticles.forEach((element) => {
          const src = extractSrc(element.contents);
          imCard.push(
            <Card className="menu-card-root" variant="outlined">
              <CardActionArea onClick={getLinkHandler(element)}>
                <CardMedia
                  image={src}
                  title={element.title}
                  className="menu-card-media"
                />
                <CardContent>
                  <Typography
                    className="menu-card-title"
                    gutterBottom
                    variant="subtitle1"
                  >
                    {element.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`${kindTable[element.kind].text} · ${dateToString(
                      element.meta.createdAt
                    )}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        });
        setImageCards(imCard);
      });
    });

    getArticles(1, 10, "issue-paper", undefined, undefined, undefined).then(
      async (res) => {
        const ipPrev = [];
        for (let i = 0; i < res.length; ++i) {
          const element = res[i];
          if (await hasPDF(element)) {
            ipPrev.push(<DocumentPreview article={element}></DocumentPreview>);
          }
          if (ipPrev.length === 2) {
            break;
          }
        }
        setIssuePaperPreview(ipPrev);
      }
    );

    getArticles(1, 10, "archive", undefined, undefined, undefined).then(
      async (res) => {
        const archPrev = [];
        for (let i = 0; i < res.length; ++i) {
          const element = res[i];
          if (await hasPDF(element)) {
            archPrev.push(
              <DocumentPreview article={element}></DocumentPreview>
            );
          }
          if (archPrev.length === 2) {
            break;
          }
        }
        setArchivePreview(archPrev);
      }
    );
  }

  function getProjectSlides() {
    const projects = t("home", { ns: "projects", returnObjects: true });
    let slides = [];
    const container = [];

    projects.forEach((proj) => {
      slides.push(
        <div className="comment-each">
          <h2>{proj.title}</h2>
          <h5>{`${proj.client} [${proj.when}]`}</h5>
        </div>
      );

      if (slides.length === 3) {
        container.push(
          <div className="comment-background">
            <div className="comment-container">{slides}</div>
          </div>
        );
        slides = [];
      }
    });

    if (slides.length) {
      container.push(
        <div className="comment-background">
          <div className="comment-container">{slides}</div>
        </div>
      );
    }

    return container;
  }

  function updateHubPreviews() {
    function getClickHandler(index) {
      return () => {
        history.push(`/hub/${index}`);
      };
    }

    const buttons = [];
    hubJson.firstCate.forEach((title, index) => {
      buttons.push(
        <Paper
          className="hub-preview-paper"
          elevation={4}
          style={{
            background: `url(${categoryImage[title]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Tooltip
            title={`클릭하시면 '${title}' 분야의 기업들을 볼 수 있습니다.`}
          >
            <ButtonBase
              className="hub-preview-button"
              onClick={getClickHandler(index)}
            >
              <span className="hub-preview-text">{title}</span>
              <span className="hub-preview-text">{cateToEng[title]}</span>
            </ButtonBase>
          </Tooltip>
        </Paper>
      );
    });

    setHubPreviewRows([
      buttons.slice(0, 6),
      buttons.slice(7, 13),
      buttons.slice(14, 20),
    ]);
  }

  return (
    <React.Fragment>
      <div className="banner-root">
        <div className="banner-overlay">
          <div className="banner-layout">
            <div className="banner-row">
              <div className="notice-layout">
                <NoticeBoard rowCount={4}></NoticeBoard>
              </div>
              <div className="hub-preview-layout">
                <Paper className="hub-preview-header" square variant="outlined">
                  <h4>
                    스마트도시수출 거점HUB 플랫폼 {"&"} Smart City Export HUB
                    Platform
                  </h4>
                </Paper>

                <div className="hub-preview-table">
                  {hubPreviewRows.map((row) => (
                    <div className="hub-preview-row">{row}</div>
                  ))}
                  {/* <div className="hub-preview-table-left">신남방</div>
                  <div
                    className="hub-preview-table-right"
                    onClick={() => {
                      history.push("/hub");
                    }}
                  >
                    HUB
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="slide-container">
            <Fade>{getProjectSlides()}</Fade>
          </div>
        </div>
      </div>

      <div className="board-background board-puple">
        <div className="board-column-container">
          <h3 className="board-title">미디어로 보는 최근 소식</h3>
          <div className="menu-card-layout">{imageCards}</div>
        </div>
      </div>

      <div className="board-background board-puple">
        <div className="board-row-container board-row-inner-sep">
          <div className="board-half">
            <h3 className="board-title">최신 Issue Paper</h3>
            <div className="preview-layout">{issuePaperPreview}</div>
          </div>
          <div className="board-half">
            <h3 className="board-title">
              최신 신남방 &amp; 스마트도시 기술 리포트
            </h3>
            <div className="preview-layout">{archivePreview}</div>
          </div>
        </div>
      </div>

      <div className="board-background bottom-banner board-light-puple">
        <div className="board-column-container">
          <div>
            <h3 className="board-title">
              한-아세안 스마트도시수출 거점HUB 플랫폼
            </h3>
          </div>
        </div>
        <div className="board-banner-container">
          <div className="click-area-container">
            {countries.map(({ bannerPosition }, index) => (
              <div
                className="click-area-item"
                style={{ left: bannerPosition[0], top: bannerPosition[1] }}
                onClick={() => {
                  history.push(`/asean/${index}`);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={archOpen}
        className="modal"
        onClose={() => setArchOpen(false)}
      >
        <div className="modal-content">
          <h2>나가려면 화면의 좌우 바깥쪽을 클릭하세요.</h2>

          <div className="modal-section">
            <div className="modal-title">
              <h1>정부</h1>
            </div>
            <div className="modal-menu">
              <CardBoard
                variant="small"
                menuList={archMenu.goverment}
              ></CardBoard>
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-title">
              <h1>신남방</h1>
            </div>
            <div className="modal-menu">
              <CardBoard
                variant="small"
                menuList={archMenu.newSouthern}
              ></CardBoard>
            </div>
          </div>

          <div className="modal-section">
            <div className="modal-title">
              <h1>스마트도시</h1>
            </div>
            <div className="modal-menu">
              <CardBoard
                variant="small"
                menuList={archMenu.smartCity}
              ></CardBoard>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
