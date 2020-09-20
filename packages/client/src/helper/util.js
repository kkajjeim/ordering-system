export const getDateStr = (date) => {
    date = new Date(date);
    let sYear = date.getFullYear();
    let sMonth = date.getMonth() + 1;
    let sDate = date.getDate();

    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    sDate  = sDate > 9 ? sDate : "0" + sDate;
    return `${sYear}-${sMonth}-${sDate}`;
};
