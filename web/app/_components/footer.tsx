import Image from "next/image";
import { Translate } from "@locales";
import Container from "@components/container";

import uosLogoImg from "@resources/images/uos-logo.png";

export default function Footer(props: { t: Translate; className?: string }) {
  const { t } = props;

  return (
    <div className={`bg-global-gray-light border-t ${props.className ?? ""}`}>
      <Container className="pt-6 pb-10">
        <footer className="flex flex-col lg:flex-row justify-between text-sm text-uos-gray">
          <div>
            <p className="mb-1 font-medium">{t("labAddress")}</p>
            <p>
              <TelephoneIcon className="inline-block mr-1" />
              Tel : <a href="tel:+82264905154">+82-2-6490-5154</a>
            </p>
            <p>
              <PhoneIcon className="inline-block mr-1" />
              CP : <a href="tel:+821029692504">+82-10-2969-2504</a>
            </p>
            <p>
              <EnvelopeIcon className="inline-block mr-1" />
              Email : <a href="mailto:chunhoy7@uos.ac.kr">chunhoy7@uos.ac.kr</a>
            </p>
            <p className="mt-1">
              Copyright 2024 Global Urban &#38; Infrastructure Research Center.
              All Rights Reserved.
            </p>
          </div>
          <div>
            <a href="https://uos.ac.kr/main.do">
              <Image
                src={uosLogoImg}
                alt="University of Seoul"
                width={224}
                className="object-cover h-24 pointer-events-none"
              />
            </a>
          </div>
        </footer>
      </Container>
    </div>
  );
}

const TelephoneIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={props.className ?? ""}
  >
    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
  </svg>
);

const PhoneIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={props.className ?? ""}
  >
    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
  </svg>
);

const EnvelopeIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={props.className ?? ""}
  >
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
  </svg>
);
