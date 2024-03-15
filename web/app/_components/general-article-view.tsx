import Link from "next/link";

export function GeneralArticleTable(props: {
  articles: {
    index: number;
    title: string;
    href: string;
    createdAt: string;
    viewCount: number;
  }[];
  className?: string;
}) {
  return (
    <table className={`border-collapse table-fixed ${props.className}`}>
      <colgroup>
        <col width="10%"></col>
        <col width="65%"></col>
        <col width="15%"></col>
        <col width="10%"></col>
      </colgroup>
      <thead>
        <tr className="[&>th]:p-2 [&>th]:border-y [&>th]:font-medium [&>th]:bg-global-gray-light">
          <th>번호</th>
          <th>제목</th>
          <th>작성 날짜</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {props.articles.map((article, idx) => (
          <tr key={idx} className="[&>td]:p-2 [&>td]:border-y hover:bg-global-gray-soft">
            <td className="!border-l-0 text-center">{article.index}</td>
            <td className="text-ellipsis overflow-hidden whitespace-nowrap">
              <Link className="hover:underline" href={article.href}>
                {article.title}
              </Link>
            </td>
            <td className="text-center">{article.createdAt}</td>
            <td className="!border-r-0 text-center">{article.viewCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Pagination(props: {
  count: number;
  maxCount: number;
  current: number;
  hrefBuilder: (page: number) => string;
  className?: string;
}) {
  const { count, maxCount, current, hrefBuilder } = props;

  function createSequence(start: number, end: number) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  // create a list of pages
  let pages = [];
  const sideCount = Math.floor(count / 2);
  if (maxCount < count) {
    pages = createSequence(1, maxCount);
  } else if (current < sideCount + 1) {
    pages = createSequence(1, count);
  } else if (current > maxCount - sideCount) {
    pages = createSequence(maxCount - count + 1, maxCount);
  } else {
    pages = createSequence(current - sideCount, current + sideCount);
  }

  return (
    <nav className={`flex -space-x-px ${props.className}`} aria-label="Pagination">
      <Link
        href={hrefBuilder(1)}
        className="inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 border border-gray-200 hover:bg-global-gray-soft focus:z-20"
      >
        <span className="sr-only">Fisrt</span>
        <svg className="h-5 w-5" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
        </svg>
      </Link>
      {pages.map((pageNum) => (
        <Link
          className={`inline-flex items-center px-4 py-2 text-sm focus:z-20 ${
            pageNum === current
              ? "bg-uos-signiture-blue text-white"
              : "ring-1 ring-inset ring-gray-200 hover:bg-global-gray-soft"
          }`}
          aria-current={pageNum === current ? "page" : undefined}
          href={hrefBuilder(pageNum)}
          key={pageNum}
        >
          {pageNum}
        </Link>
      ))}
      <Link
        href={hrefBuilder(maxCount)}
        className="inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 border border-gray-200 hover:bg-global-gray-soft focus:z-20"
      >
        <span className="sr-only">Fisrt</span>
        <svg className="h-5 w-5" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5.59 7.41 10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
        </svg>
      </Link>
    </nav>
  );
}

export function GeneralArticleViewSkeleton() {
  return (
    <div role="status" className="border-y w-full">
      <div className="w-full border-y bg-global-gray-soft px-3 py-2 animate-pulse">
        <div className="h-5 w-64 bg-gray-300 rounded-full m-1"></div>
      </div>
      <div className="w-full border-b bg-global-gray-soft px-3 py-2 animate-pulse">
        <div className="h-5 w-32 bg-gray-300 rounded-full m-1"></div>
      </div>
      {[360, 330, 300, 380, 420].map((width, idx) => (
        <div
          className="h-4 bg-gray-200 rounded-full m-4"
          key={idx}
          style={{ maxWidth: width }}
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function GeneralArticleView(props: {
  id: number;
  title: string;
  contents: string;
  createdAt: string;
  viewCount: number;
  attachments?: { name: string; href: string }[];
}) {
  return (
    <article>
      <div className="border-y">
        <h1 className="text-lg font-medium border-y bg-global-gray-soft px-3 py-2">
          {props.title}
        </h1>
        <div role="contentinfo" className="flex items-center border-b px-3 py-2">
          <svg className="w-4 mr-1" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 22H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7zm10.13-5.01.71-.71c.39-.39.39-1.02 0-1.41l-.71-.71a.9959.9959 0 0 0-1.41 0l-.71.71zm-.71.71-5.3 5.3H14v-2.12l5.3-5.3z"></path>
          </svg>
          <span className="mr-6">작성 날짜 {props.createdAt}</span>
          <svg className="w-4 mr-1" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"></path>
          </svg>
          <span>조회수 {props.viewCount}</span>
        </div>
        {props.attachments && props.attachments.length > 0 && (
          <div className="flex items-start border-b px-3 py-2">
            <div className="flex items-center mr-6">
              <svg className="w-4 mr-1" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z"></path>
              </svg>
              <span>첨부파일</span>
            </div>
            <ol className="flex-1 list-decimal">
              {props.attachments.map((att, idx) => (
                <li key={idx}>
                  <Link className="hover:underline" href={att.href}>
                    {att.name}
                    <svg
                      className="w-4 ml-1 inline-block"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5z"></path>
                    </svg>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div
        className="ck-content mt-2 p-2"
        role="article"
        dangerouslySetInnerHTML={{ __html: props.contents }}
      ></div>
    </article>
  );
}
