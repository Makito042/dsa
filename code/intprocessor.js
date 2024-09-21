const fs = require('fs'); 
const path = require('path'); 

// Class for processing integers from a file
class IntProcessor {
    constructor(stripFunction, sortFunction) {
        this.stripFunction = stripFunction; 
        this.sortFunction = sortFunction; 
    }

    processFile(fileLines) {
        const uniqueIntegers = new Set(); 

        for (const line of fileLines) {
            const strippedLine = this.stripFunction(line); 
            if (!strippedLine) continue; 

            const parts = strippedLine.split(/\s+/); 
            if (parts.length !== 1) continue; 

            const processedInteger = parseInt(parts[0], 10); 
            if (!isNaN(processedInteger) && processedInteger >= -1023 && processedInteger <= 1023) {
                uniqueIntegers.add(processedInteger); 
            }
        }

        return this.sortFunction(Array.from(uniqueIntegers)); 
    }

    readAndWriteToFile(inputFileName) {
        try {
            const rawData = fs.readFileSync(inputFileName, 'utf-8').split('\n');
            const processedData = this.processFile(rawData); 

            if (processedData.length === 0) {
                console.warn("No valid integers found."); 
            }

            const outputFileName = `${inputFileName.replace('.txt', '')}_results.txt`; 
            fs.writeFileSync(outputFileName, processedData.join('\n') + '\n'); 

            console.log(`Data written to: ${outputFileName}`);
        } catch (error) {
            console.error(`Failed to open file: ${error.message}`); 
        }
    }
}

// Main execution block that runs when the script is executed directly
if (require.main === module) {
    const fileName = process.argv[2]; 

    if (!fileName) {
        console.log("Usage: node IntProcessor.js <filename>"); 
        process.exit(1); 
    }

    const processor = new IntProcessor(
        line => line.trim(), 
        arr => arr.sort((a, b) => a - b) 
    );

    const startTime = Date.now(); 
    processor.readAndWriteToFile(fileName); 
    const endTime = Date.now();

    console.log(`Run time: ${(endTime - startTime)} ms`);
}
