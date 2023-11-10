

function compareEvents(eventA, eventB) {
    const dateAStringFormat = eventA?.date?.toString();
    const dateBStringFormat = eventB?.date?.toString();
    const dateAString = dateAStringFormat.substring(0,dateAStringFormat.indexOf("T"))+"T"+eventA?.time+":00.000Z"
    const dateBString = dateBStringFormat.substring(0,dateBStringFormat.indexOf("T"))+"T"+eventB?.time+":00.000Z"

    const dateA = new Date(dateAString);
    const dateB = new Date(dateBString);
  
    return dateB - dateA ;
}

module.exports = compareEvents; 