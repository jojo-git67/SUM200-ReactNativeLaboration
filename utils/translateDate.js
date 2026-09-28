function translateDate(date){
    date = String(date);

    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

export default translateDate;