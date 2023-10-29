
const now = new Date();

function compareEvents(eventA, eventB) {
    const dateA = new Date(eventA.date);
    const dateB = new Date(eventB.date);
  
    const timeA = eventA.time.split(':').map(Number);
    const timeB = eventB.time.split(':').map(Number);
  
    dateA.setHours(timeA[0], timeA[1]);
    dateB.setHours(timeB[0], timeB[1]);
  
    const timeDifferenceA = Math.abs(dateA - now);
    const timeDifferenceB = Math.abs(dateB - now);
  
    return timeDifferenceA - timeDifferenceB;
}

module.exports = compareEvents; 