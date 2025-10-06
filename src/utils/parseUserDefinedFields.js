export default function parseUserDefinedFields(fields) {
    if (!fields || typeof fields !== 'object') {
        return {};
    }

    const parsedFields = [];
    Object.keys(fields).forEach(key => {
        if (fields[key] && typeof fields[key] === 'object') {
            parsedFields.push(JSON.parse(JSON.stringify(fields[key])));
        } else {
            parsedFields.push(fields[key]);
        }
    });

    return parsedFields;
}