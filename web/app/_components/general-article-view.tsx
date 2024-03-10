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
