export function dateToString(date) {
    if (typeof date === "string") {
        // date가 "2021-01-13T18:35:10.470Z"와 같은 문자열로 들어오는 경우를 대비하여,
        // date의 타입이 string이라면 그 문자열로 Date를 생성하여 아래 과정을 진행함.
        date = new Date(date);
    }

    if (date === undefined) {
        return "-";
    }

    let dateStr = date.getFullYear() + "-" 
                + (date.getMonth()+1 <= 9 ? "0" : "") + (date.getMonth()+1) + "-"
                + (date.getDate() <= 9 ? "0" : "") + date.getDate();
    return dateStr;
}