export const formatDate = (dateString) => {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate)) {
      throw new Error('Invalid date');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    inputDate.setHours(0, 0, 0, 0);
  
    const diffInDays = (inputDate - today) / (1000 * 60 * 60 * 24);

    let prefix = '';
    if (diffInDays === 0) {
      prefix = 'Today';
    } else if (diffInDays === 1) {
      prefix = 'Tomorrow';
    } else {
      prefix = inputDate.toLocaleString('en-US', { weekday: 'long' });
    }
  
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();
    const month = inputDate.toLocaleString('en-US', { month: 'long' });

    return `${prefix} - ${day} ${month}, ${year}`;
  };