export const formatDate = (date: Date) => {
    const objDate = new Date(date);

    const year = objDate.getFullYear();
    const month = (objDate.getMonth() + 1).toString().padStart(2, '0');
    const day = objDate.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
};
