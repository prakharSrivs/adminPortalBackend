

function compareEvents(eventA, eventB) {
    const dateAString = eventA?.date?.substring(0,eventA?.date?.indexOf("T"))+"T"+eventA?.time+":00.000Z"
    const dateBString = eventB?.date?.substring(0,eventB?.date?.indexOf("T"))+"T"+eventB?.time+":00.000Z"

    const dateA = new Date(dateAString);
    const dateB = new Date(dateBString);
  
    return dateB - dateA ;
}

module.exports = compareEvents; 