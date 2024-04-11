"use client";

import { Locale, ProjectRecordItem } from "core/model";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectRecordList, setProjectRecordList } from "@/actions";

function ProjectRecordItemView(props: {
  initialData: ProjectRecordItem;
  children?: React.ReactNode;
  onChange?: (data: ProjectRecordItem) => void;
}) {
  const yearStartField = useRef<HTMLInputElement>(null);
  const yearEndField = useRef<HTMLInputElement>(null);
  const clientField = useRef<HTMLInputElement>(null);
  const titleField = useRef<HTMLInputElement>(null);
  const isPrimaryField = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const [yearStart, yearEnd] = props.initialData.year;
    yearStartField.current!.value = yearStart ? yearStart.toString() : "";
    yearEndField.current!.value = yearEnd ? yearEnd.toString() : "";

    const { client, title, isPrimary } = props.initialData;
    clientField.current!.value = client || "";
    titleField.current!.value = title || "";
    isPrimaryField.current!.checked = isPrimary ? true : false;
  }, []);

  const getData = () => {
    const yearStart = parseInt(yearStartField.current!.value);
    const yearEnd = yearEndField.current!.value ? parseInt(yearEndField.current!.value) : undefined;

    return {
      year: yearEnd ? [yearStart, yearEnd] : [yearStart],
      client: clientField.current!.value,
      title: titleField.current!.value,
      isPrimary: isPrimaryField.current!.checked,
    } as ProjectRecordItem;
  };

  return (
    <div className="mt-2">
      <hr className="my-4" />
      <div className="[&>*]:mr-2 mb-1">
        <label htmlFor="year">시작 기간</label>
        <input
          className="w-16 px-1 border-2 rounded-sm bg-white disabled:border-none"
          type="number"
          id="year"
          ref={yearStartField}
          onChange={(e) => props.onChange?.(getData())}
        />
        <label htmlFor="year">종료 기간</label>
        <input
          className="w-16 px-1 border-2 rounded-sm bg-white disabled:border-none"
          type="number"
          id="year"
          ref={yearEndField}
          onChange={(e) => props.onChange?.(getData())}
        />
      </div>
      <div className="[&>*]:mr-2 mb-1">
        <label htmlFor="client">발주처</label>
        <input
          className="w-48 px-1 border-2 rounded-sm bg-white disabled:border-none"
          type="text"
          id="client"
          ref={clientField}
          onChange={(e) => props.onChange?.(getData())}
        />
        <input
          type="checkbox"
          id="isPrimary"
          ref={isPrimaryField}
          onChange={(e) => props.onChange?.(getData())}
        />
        <label
          htmlFor="isPrimary"
          onClick={(e) => {
            e.preventDefault();
            isPrimaryField.current!.checked = !isPrimaryField.current!.checked;
            props.onChange?.(getData());
          }}
        >
          주요 사업
        </label>
      </div>
      <div className="flex mb-1">
        <label className="mr-2 flex-none" htmlFor="title">
          사업명
        </label>
        <input
          className="w-full px-1 border-2 rounded-sm bg-white disabled:border-none"
          type="text"
          id="title"
          ref={titleField}
          onChange={(e) => props.onChange?.(getData())}
        />
      </div>
      {props.children}
    </div>
  );
}

export default function Page(props: { params: { lang: Locale } }) {
  const [projects, setProjects] = useState<{ id: number; item: ProjectRecordItem }[]>([]);
  const [firstRender, setFirstRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (firstRender) {
      getProjectRecordList(props.params.lang).then((data) =>
        setProjects(
          data.map((item, id) => ({
            id,
            item,
          }))
        )
      );
      setFirstRender(false);
    }
  }, [firstRender]);

  useEffect(() => {
    if (!firstRender && projects.length === 0) {
      setProjects([
        {
          id: 0,
          item: {
            year: [new Date().getFullYear()],
            client: "",
            title: "",
            isPrimary: false,
          },
        },
      ]);
    }
  }, [projects]);

  return (
    <div>
      {projects.map((proj, idx) => (
        <ProjectRecordItemView
          key={proj.id}
          initialData={proj.item}
          onChange={(data) => {
            const newProjects = [...projects];
            newProjects[idx].item = data;
            setProjects(newProjects);
          }}
        >
          <div className="[&>*]:mr-2 mt-3">
            <button
              className="btn btn-secondary btn-sm"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                if (idx === 0) return;
                const newProjects = [...projects];
                newProjects.splice(idx, 1); // remove
                newProjects.splice(idx - 1, 0, proj); // insert
                setProjects(newProjects);
              }}
            >
              올리기
            </button>
            <button
              className="btn btn-secondary btn-sm"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                if (idx === projects.length - 1) return;
                const newProjects = [...projects];
                newProjects.splice(idx, 1); // remove
                newProjects.splice(idx + 1, 0, proj); // insert
                setProjects(newProjects);
              }}
            >
              내리기
            </button>
            <button
              className="btn btn-success btn-sm"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                const latestId = projects.reduce((acc, cur) => Math.max(acc, cur.id), 0);
                const newProjects = [...projects];
                newProjects.splice(idx + 1, 0, {
                  id: latestId + 1,
                  item: {
                    year: [new Date().getFullYear()],
                    client: "",
                    title: "",
                    isPrimary: false,
                  },
                });
                setProjects(newProjects);
              }}
            >
              새 항목 추가
            </button>
            <button
              className="btn btn-danger btn-sm"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm(`정말 "${proj.item.title}"를 삭제하시겠습니까?`) === false)
                  return;
                const newProjects = [...projects];
                newProjects.splice(idx, 1);
                setProjects(newProjects);
              }}
            >
              삭제
            </button>
          </div>
        </ProjectRecordItemView>
      ))}
      <div className="sticky bottom-0 h-16 w-full border mt-8 rounded-t-lg bg-global-gray-soft flex justify-end items-center shadow-md">
        <div className="px-4 [&>*]:ml-2">
          <button
            className="btn btn-primary"
            role="button"
            onClick={async (e) => {
              e.preventDefault();
              await setProjectRecordList(
                props.params.lang,
                projects!.map((proj) => proj.item)
              );
              alert("저장되었습니다.");
              router.push("/projects/summary");
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
