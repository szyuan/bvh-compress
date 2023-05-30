const fs = require('fs');
const path = require('path');

function deleteLines(filePath, outPath, rate) {
    const rateNum = 1 - rate;
    const fraction = decimalToFraction(rateNum);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        const lines = data.split('\n');
        let newLines = [];

        let frameTimeValue;
        let frameStartLineIndex = 0;
        let frameLineIndex = 0;

        let framesValueLineIndex = 0;
        let frameTimeValueLineIndex = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('Frames:')) {
                framesValueLineIndex = i;
            } else if (line.startsWith('Frame Time:')) {
                frameTimeValue = parseFloat(line.split(':')[1].trim());
                frameTimeValueLineIndex = i;
                frameStartLineIndex = i + 2;
            }

            // 进入了帧信息行
            if (frameStartLineIndex > 0 && i >= frameStartLineIndex) {
                frameLineIndex = i - frameStartLineIndex;
                let remainder = (frameLineIndex) % fraction.denominator;
                if (remainder === 0) {
                    // 每一段的第一位，保留，从后一位开始删除
                    newLines.push(line);
                    deleteCount = 0
                } else {
                    if (deleteCount >= fraction.numerator) {
                        newLines.push(line);
                    } else {
                        deleteCount++;
                    }
                }
            } else {
                newLines.push(line);
            }
        }

        const newFramesValue = newLines.length - 1 - framesValueLineIndex - 2;
        newLines.splice(framesValueLineIndex, 1, `Frames: ${newFramesValue}`);
        const newFrameTime = frameTimeValue * 1/rate;
        newLines.splice(frameTimeValueLineIndex, 1, `Frame Time: ${newFrameTime}`);

        const newFileContent = newLines.join('\n');

        fs.writeFile(outPath, newFileContent, (err) => {
        if (err) {
            throw err;
        }

        console.log(`Completed!`);
        })
    })
}

function decimalToFraction(decimal) {
    const precision = 3;
    const str = decimal.toFixed(precision);
    const decimalDigits = str.split('.')[1];

    const numerator = parseInt(decimalDigits);
    const denominator = Math.pow(10, decimalDigits.length);
    const gcd = greatestCommonDivisor(numerator, denominator);
    return {numerator: numerator / gcd, denominator: denominator / gcd};
}
  
function greatestCommonDivisor(a, b) {
    return b == 0 ? a : greatestCommonDivisor(b, a % b);
}

function _compress(source, dest, rate = 0.5) {
    if (rate >= 1) {
        return console.error('The compressed quality cannot be greater than 1\n压缩后的质量不能大于1');
    }
    if (!dest) dest = path.resolve('out.bvh');

    console.log('dest: ', dest);
    console.log('source', path.resolve(source));
    
    if (fs.existsSync(source)) {
        deleteLines(source, dest, rate);
    } else {
        return console.error('Source file does not exist\n源文件不存在', source);
    }
}

// deleteLines('source/motion.bvh', 0.9);

module.exports = {
    _compress
};