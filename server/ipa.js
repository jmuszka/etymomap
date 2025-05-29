// import fs from 'fs';
const fs = require('node:fs');

const getIPASpelling = (word) => {

    try {
        const data = fs.readFileSync('en_US.json', 'utf8');
        return JSON.parse(data)['en_US'][0][word]
    } catch (err) {
        return ""
    }
}

module.exports = {getIPASpelling}