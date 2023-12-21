

function compareEvents(eventA, eventB) {
    const dateA = new Date(eventA.date);
    const dateB = new Date(eventB.date);
    return dateA - dateB;
}

module.exports = compareEvents; 
