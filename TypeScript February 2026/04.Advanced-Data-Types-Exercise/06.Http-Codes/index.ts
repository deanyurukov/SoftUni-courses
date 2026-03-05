type Code = {
    code: number,
    text: string,
    printChars?: number
}

function httpCodes(code: Code): string {
    if (code.printChars) {
        return code.text.slice(0, code.printChars);
    }

    return code.text;
}

console.log(httpCodes({ code: 200, text: 'OK'}));