export const API = "http://3.101.126.126:4000"

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
  export function formatDate1(isoDate) {
    const date = new Date(isoDate);
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };

    // Convert the date to the desired format
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const [datePart, timePart] = formattedDate.split(', ');

    return `${datePart.replace(/\//g, '-')} / ${timePart}`;
}