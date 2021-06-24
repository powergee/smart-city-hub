import axios from "axios"
import * as crypto from 'crypto';

export async function getSalt(id) {
    const query = {
        userId: id
    };

    try {
        let res = await axios.get("/v1/salt", { params: query, withCredentials: true });
        return res.data.userPwSalt;
    } catch (err) {
        console.error("In getSalt: " + err?.response?.data);
        throw err;
    }
}

export async function getArticles(page, perPage, kindRegex, contentsRegex, titleRegex, createdByRegex) {
    const query = {
        page: page,
        perPage: perPage,
        kindRegex: kindRegex,
        contentsRegex: contentsRegex,
        titleRegex: titleRegex,
        createdByRegex: createdByRegex
    };

    try {
        let res = await axios.get("/v1/articles", { params: query, withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getArticles: " + err?.response?.data);
        throw err;
    }
}

export async function countArticles(kind) {
    const query = {
        kind: kind
    };

    try {
        let res = await axios.get("/v1/articles/count", { params: query, withCredentials: true });
        return res.data.articleCount;
    } catch (err) {
        console.error("In countArticles: " + err?.response?.data);
        throw err;
    }
}

export async function tryLogin(id, pw) {
    const salt = await getSalt(id);

    if (typeof salt?.response?.status === "number") {
        throw salt;
    }

    // scryptSync를 사용하려고 했으나, is not a function이라는 오류와 함께 되지 않음.
    // 대신 SHA512를 사용.
    const hashed = crypto.createHash("sha512").update(pw + salt).digest("base64");
    const reqBody = {
        userId: id,
        userPwHash: hashed
    };

    try {
        let res = await axios.post("/v1/login", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In tryLogin: " + err?.response?.data);
        throw err;
    }
}

export async function tryRegister(id, pw, name) {
    const salt = crypto.randomBytes(32).toString("base64");
    // scryptSync를 사용하려고 했으나, is not a function이라는 오류와 함께 되지 않음.
    // 대신 SHA512를 사용.
    const hashed = crypto.createHash("sha512").update(pw + salt).digest("base64");
    const reqBody = {
        userId: id,
        userPwHash: hashed,
        userPwSalt: salt,
        userName: name
    };

    try {
        let res = await axios.post("/v1/register", reqBody, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In tryRegister: " + err?.response?.data);
        throw err;
    }
}

export async function tryLogout() {
    try {
        let res = await axios.post("/v1/logout", {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In tryLogin: " + err?.response?.data);
        throw err;
    }
}

export async function getArticle(articleId) {
    try {
        let res = await axios.get("/v1/articles/" + articleId, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getArticle: " + err?.response?.data);
        throw err;
    }
}

export async function postArticle(article) {
    try {
        let res = await axios.post("/v1/articles/", article, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In postArticle: " + err?.response?.data);
        throw err;
    }
}

export async function deleteArticle(articleId) {
    try {
        await axios.delete("/v1/articles/" + articleId, { withCredentials: true });
    } catch (err) {
        console.error("In deleteArticle: " + err?.response?.data);
        throw err;
    }
}

export async function uploadFile(file) {
    try {
        let form = new FormData();
        form.append("file", file);
        let res = await axios.post("/v1/files/upload", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (err) {
        console.error("In uploadFile: " + err?.response?.data);
        throw err;
    }
}

export async function getFileInfo(fileId) {
    try {
        let res = await axios.get("/v1/files/info/" + fileId, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getFileInfo: " + err?.response?.data);
        throw err;
    }
}

export async function downloadFile(fileId) {
    try {
        let res = await axios.get("/v1/files/download/" + fileId, { 
            withCredentials: true,
            responseType: "blob"
        });

        const cd = res.headers["content-disposition"];
        const fnIdx = cd.indexOf("filename");
        const left = cd.indexOf("\"", fnIdx);
        const right = cd.indexOf("\"", left+1);
        const filename = cd.substring(left+1, right);

        let blob = new Blob([res.data]);

        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, filename);
        } else {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (err) {
        console.error("In downloadFile: " + err?.response?.data);
        throw err;
    }
}
