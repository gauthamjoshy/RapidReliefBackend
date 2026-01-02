const { GoogleGenAI } = require("@google/genai")
const fs = require("fs")

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const imageToGenerativePart = (filePath, mimeType)=>{
    const  imageBuffer = fs.readFileSync(filePath)
    return {
        inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType
        }
    }
}

exports.analyzeReport = async (report, images = []) => {
    const imageParts = images.map((file)=>
    imageToGenerativePart(file.path, file.mimetype))

    const prompt = `Consider yourself as the AI who analyze the reports submitted by user to a disaster management organization. Return the following details after analyzing the user submitted report and images
    Analyze the USER REPORT and ATTACHED IMAGES.
    important rule(do not break):
    Return ONLY valid JSON.
    Do NOT wrap the response in markdown.
    Do NOT use backticks.
    Do NOT add explanations.
    Return ONLY a valid JSON object in the following structure:

{
  "status": "pending",
  "assignedOrganization": "",
  "incidentOverview": "",
  "severity": "Low | Medium | High",
  "location": "",
  "name": "",
  "phoneNumber": "",
  "address": "",
  "userDescription": "",
  "keywords": [],
  "aiAnalysisAndRecommendations": ""
}
USER DETAILS:
Name: ${report.name}
Location: ${report.location}
Phone: ${report.pNum}
Address: ${report.address}
UserDescription: ${report.description}
userMail:${report.userMail}
images:${report.images}


IMAGE INSTRUCTIONS:
- Identify visible damage
- Detect flooding, fire, landslide, collapsed structures, trapped people
- Increase severity if images confirm danger
- Cross-check text vs images

example of an expected report
    {
        "status": "pending",
        "assignedOrganization": "",
        "incidentOverview": "Major landslide at Nedumkandam, Idukki. Roads completely blocked, power cut off, and people trapped. Urgent help required.",
        "severity": "High",
        "location": "Nedumkandam, Idukki, Kerala",
        "dateAndTime": "2023-10-27T10:30:00+05:30",
        "name": "Aditya Suresh",
        "phoneNumber": "9568785458",
        "address": "Nedumkandam P.O, Idukki",
        "userDescription": "A major landslide at Nedumkandam, Idukki. Roads are fully blocked, all power sources are cut off. Many people trapped. We need urgent help.",
        "userMail": "alan@gmail.com",
        "keywords": [
          "Landslide",
          "Road Blocked",
          "Power Outage",
          "People Trapped",
          "Urgent Help"
        ],
        "images":["http://localhost:3000/uploads/image.png" ],
        "aiAnalysisAndRecommendations": "This incident is classified as high severity. Immediate intervention is required. Dispatch emergency response teams, clear road obstacles, restore power, and notify local authorities. Prioritize rescue operations for trapped individuals."
    } 
`


    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{role: "user",
            parts: [{text: prompt}, ...imageParts]
        }]
    })
    //    console.log(response);
    //    console.log(JSON.parse(response))

    //    return response
    // const aiResponse = response.candidates[0].content[0].parts[0].text

    const aiResponse = response.candidates[0].content.parts[0].text
    return aiResponse

    // const aiResponse = response.text
    // const parsedResult = JSON.parse(aiResponse);
    // return parsedResult

}