const fs = require('fs'); 
const path = require('path'); 

// A class for processing integers from a file, ensuring they are within a certain range
class IntProcessor {
    constructor(lineCleaner, numberSorter) {
        this.lineCleaner = lineCleaner; 
        this.numberSorter = numberSorter; 
    }

    // Processes lines from the file to extract unique integers
    processFile(lines) {
        const uniqueIntegers = new Set(); 

        for (const line of lines) {
            const cleanedLine = this.lineCleaner(line); 
            if (!cleanedLine) continue;  

            const parts = cleanedLine.split(/\s+/); 
            if (parts.length !== 1) continue;  

            const parsedInteger = parseInt(parts[0], 10); 
            if (!isNaN(parsedInteger) && parsedInteger >= -1023 && parsedInteger <= 1023) {
                uniqueIntegers.add(parsedInteger);  
            }
        }

        return this.numberSorter(Array.from(uniqueIntegers));  
    }

    // Reads from the input file and writes processed unique integers to an output file
    processFileToOutput(inputFileName) {
        try {
            const rawData = fs.readFileSync(inputFileName, 'utf-8').split('\n'); 
            const processedData = this.processFile(rawData); 

            if (processedData.length === 0) {
                console.warn("Warning: No valid integers were found in the provided file."); 
            }

            const outputFileName = `${inputFileName.replace('.txt', '')}_results.txt`; 
            fs.writeFileSync(outputFileName, processedData.join('\n') + '\n'); 

            console.log(`Results successfully written to: ${outputFileName}`); 
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error(`Error: File '${inputFileName}' not found.`); 
            } else {
                console.error(`Failed to open file: ${error.message}`); 
            }
        }
    }
}

// Main block to run when the script is executed directly
if (require.main === module) {
    const fileName = process.argv[2]; 

    if (!fileName) {
        console.log("Usage: node IntProcessor.js <filename>"); 
        process.exit(1); 
    }

    // Create an IntProcessor instance with specific cleaner and sorter functions
    const processor = new IntProcessor(
        line => line.trim(),              
        numbers => numbers.sort((a, b) => a - b)  
    );

    const startTime = Date.now(); 
    processor.processFileToOutput(fileName); 
    const endTime = Date.now(); 

    console.log(`Run time: ${(endTime - startTime)} ms`); 
}
