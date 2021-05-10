/*
hub-data의 '기업의 중복제거' 시트에 홈페이지 URL column을 추가하여 새로운 xlsx를 만듭니다.
*/

const xlsx = require("xlsx");
const fs = require("fs");

const fileName = "./hub-data.xlsx";
const workbook = xlsx.readFile(fileName);

const domestic = xlsx.utils.sheet_to_json(workbook.Sheets["국내"]);
const urlDict = {};

domestic.forEach((record) => {
    if (record["관련기업"] in urlDict && urlDict[record["관련기업"]] !== record["홈페이지"]) {
        console.log(`Different URL: ${urlDict[record["관련기업"]]}, ${record["홈페이지"]}`);
    }
    urlDict[record["관련기업"]] = record["홈페이지"];
});

const dupRemoved = xlsx.utils.sheet_to_json(workbook.Sheets["기업의 중복제거 (300)"]);
const result = [];
dupRemoved.forEach((record) => {
    const newRecord = {};
    newRecord["대분류"] = record["대분류"];
    newRecord["중분류"] = record["중분류"];
    newRecord["소분류(키워드)"] = record["소분류(키워드)"];
    newRecord["회사구분"] = record["회사구분"];
    newRecord["기업명"] = record["관련기업"];
    newRecord["융합얼라이언스 가입"] = record["융합얼라이언스 가입"];
    newRecord["스마트도시협회 가입"] = record["스마트도시협회 가입"];

    if (record["관련기업"] in urlDict) {
        newRecord["홈페이지"] = urlDict[record["관련기업"]];
    } else {
        newRecord["홈페이지"] = "";
    }
    result.push(newRecord);
});

const output = xlsx.utils.book_new();
const outSheet = xlsx.utils.json_to_sheet(result);
xlsx.utils.book_append_sheet(output, outSheet, "기업별 연락처");
xlsx.writeFile(output, "./generated/dup-removed-homepage.xlsx");
fs.writeFileSync("./generated/dup-removed-homepage.json", JSON.stringify(result, null, 4));