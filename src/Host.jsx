export const API = "http://13.48.10.96:4000"

export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    return `${day} ${month} ${year} - ${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  }
