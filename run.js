const axios = require("axios");
const prompt = require("prompt");
const fs = require("fs");

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function detectLanguage(filename) {
  const filenameArray = filename.split(".");
  const extension = filenameArray[filenameArray.length - 1]
  switch (extension) {
    case "py":
      return "Python";
    case "cob":
      return "COBOL";
    case "js":
      return "Javascript";
    default:
      break;
  }
}

prompt.start();

prompt.get(
  [
    {
      name: "filename",
      required: true,
    },
    { name: "apiKey", hidden: true, replace: "*" },
    {
      name: "outputFilename",
      required: true,
    },
  ],
  function (err, result) {
    const inputLanguage = detectLanguage(result.filename);
    const outputLanguage = detectLanguage(result.outputFilename);
    console.log(`Convert this from ${inputLanguage} to ${outputLanguage}`);
    
    fs.readFile(result.filename, { encoding: "utf-8" }, function (err, data) {
      if (!err) {
        // console.log("received data: " + data);
        const token = countWords(data);
        const maxTokens = token * 10;

        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + result.apiKey,
        };
        axios
          .post(
            "https://api.openai.com/v1/completions",
            {
              model: "text-davinci-003",
              prompt: `\n# Convert this from ${inputLanguage} to ${outputLanguage}\n# ${inputLanguage} version\n${data}\n# End\n# ${inputLanguage} version`,
              max_tokens: maxTokens,
            },
            {
              headers: headers,
            }
          )
          .then(({ data }) => {
            fs.writeFile(result.outputFilename, data.choices[0].text, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
      } else {
        console.error(err);
      }
    });
  }
);
