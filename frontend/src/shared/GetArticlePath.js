const kindTable = {
    "seminar": "/community/seminar",
    "workshop": "/community/workshop",
    "notices": "/news/notices",
    "smart-news": "/news/smart-news",
    "research": "/news/research",
    "issue-paper": "/publish/issue-paper",
    "archive": "/publish/archive"
};

export function getArticlePath(articleId, kind) {
    return `${kindTable[kind]}/${articleId}`;
}