// timeUtils.js
export function formatTime(time) {
    if (!time) return 'N/A';
    
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr.padStart(2, '0');
  
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  
    return `${hours}:${minutes} ${suffix}`;
  }
  