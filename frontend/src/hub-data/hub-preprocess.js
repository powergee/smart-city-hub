const xlsx = require("xlsx");
const fs = require("fs");

const fileName = "./hub-data.xlsx";
const workbook = xlsx.readFile(fileName);

const domestic = xlsx.utils.sheet_to_json(workbook.Sheets["국내"]);
fs.writeFileSync("./generated/domestic-raw.json", JSON.stringify(domestic, null, 4));

const parsed = {};
const firstCate = new Set();
const secondCate = new Set();
const thirdCate = new Set();
domestic.forEach((record) => {
    firstCate.add(record["대분류"]);
    secondCate.add(record["중분류"]);
    thirdCate.add(record["소분류(키워드)"]);
});

parsed["firstCate"] = Array.from(firstCate);
parsed["secondCate"] = Array.from(secondCate);
parsed["thirdCate"] = Array.from(thirdCate);

parsed["firstCate"].sort();
parsed["secondCate"].sort();
parsed["thirdCate"].sort();

function addUniqueElements(array, values) {
    values.forEach(v => {
        if (array.indexOf(v) === -1) {
            array.push(v);
        }
    });
}

function addNode(root, path, value) {
    let parent = root;
    path.forEach((p) => {
        if (!(p in parent.next)) {
            parent.next[p] = { values: [], next: {} };
        }
        parent = parent.next[p];
    });

    const found = parent.values.find(element => element["관련기업"] === value["관련기업"]);
    if (found) {
        addUniqueElements(found["서비스유형"], [value["서비스유형"]]);
        addUniqueElements(found["제품형태(최종제품)"], value["제품형태(최종제품)"].split(","));
    } else {
        value["서비스유형"] = [value["서비스유형"]];
        value["제품형태(최종제품)"] = value["제품형태(최종제품)"].split(",");
        parent.values.push(value);
    }
}

parsed["tree"] = { values: [], next: {} };
domestic.forEach((record) => {
    addNode(parsed["tree"], [record["대분류"], record["중분류"], record["소분류(키워드)"]], record);
});

fs.writeFileSync("./generated/domestic-parsed.json", JSON.stringify(parsed, null, 4));