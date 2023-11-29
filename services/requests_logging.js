import morgan from "morgan";

morgan.token('custom-date', (req, res) => {
    return new Date().toLocaleString(); // Customize the date format
});

const customLogFormat = '[:custom-date] :method :url :status :response-time ms - :res[content-length]';
 export default customLogFormat