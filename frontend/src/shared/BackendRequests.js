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
        console.error("In getSalt: " + err.response.data);
        throw err?.response?.status;
    }
}

export async function getArticles(kind, page, perPage) {
    const query = {
        page: page,
        perPage: perPage,
        kind: kind
    };

    try {
        let res = await axios.get("/v1/articles", { params: query, withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getArticles: " + err.response.data);
        throw err?.response?.status;
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
        console.error("In countArticles: " + err.response.data);
        throw err?.response?.status;
    }
}

export async function tryLogin(id, pw) {
    const salt = await getSalt(id);

    if (typeof salt === "number") {
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
        console.error("In tryLogin: " + err.response.data);
        throw err?.response?.status;
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
        console.error("In tryRegister: " + err.response.data);
        throw err?.response?.status;
    }
}

export async function tryLogout() {
    try {
        let res = await axios.post("/v1/logout", {}, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In tryLogin: " + err.response.data);
        throw err?.response?.status;
    }
}

export async function getArticle(articleId) {
    try {
        let res = await axios.get("/v1/articles/" + articleId, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("In getArticle: " + err.response.data);
        throw err?.response?.status;
    }
}