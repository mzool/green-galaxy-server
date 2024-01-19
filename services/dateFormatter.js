function formatReadableDate(dateString, options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) {

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}

export default formatReadableDate