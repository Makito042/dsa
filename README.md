# Utilities for processing integers and sorting arrays.

This project includes two utility functions: 'IntegerProcessor', which processes integers from a file, and'sortArray', which sorts an array of numbers using the Quick Sort method. It also provides a string stripping function to tidy up the input data.

## Installation

To use this code, you must have Node.js installed on your PC. You can get it from [nodejs.org](https://nodejs.org/).

1. Clone the repository:
 git clone https://github.com/Makito042/dsa.git

2. Navigate to the project directory:
 cd  your-repo-name

3.Usage
To execute the code, you can run it directly in Node.js or include it in your own JavaScript project.
1,Save the code in a file with a name that ends with the .js extention.
2,Run the following command in your terminal: node intprocessor.js <input_file>
   
Replace <input_file> with the location to your text file containing integers.

Functionality
Class: IntProcessor.
The IntProcessor class has methods for processing integers from text files.
Constructor parameters:
stripFunction: A function that removes whitespace from every line.
SortFunction: A function for sorting an array of numbers.
Methods
ProcessFile(fileLines): Extracts unique integers from an array of lines in the input file.
It returns a sorted array of unique integers.
The function readAndWriteToFile(inputFileName) reads data from the supplied input file.
The data is processed to extract unique integers, which are then written to an output file.

Example Usage
Given an input file named input.txt containing:
text
5
3
8
1
2
5
3

You can run:
bash
node IntProcessor.js input.txt

This will create an output file named input_results.txt containing:
text
1
2
3
5
8
