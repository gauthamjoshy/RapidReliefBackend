const { GoogleGenAI } = require("@google/genai")

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

exports.analyzeReport = async (report) => {
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Consider yourself as the AI who analyze the reports submitted by user to a disaster management organization. Return the following details after analyzing the user submitted report and images.
    STRICT RULES (DO NOT BREAK):
    - Return ONLY valid JSON
    - Do NOT wrap response in markdown
    - Do NOT use backticks
    - Do NOT include explanations or extra text
    - Do NOT format text using markdown
    - Use ONLY the exact keys defined below:
    
    example of an expected report
    {
        "status": "pending",
        "incidentOverview": "Major landslide at Nedumkandam, Idukki. Roads completely blocked, power cut off, and people trapped. Urgent help required.",
        "severity": "High",
        "location": "Nedumkandam, Idukki, Kerala",
        "dateAndTime": "2023-10-27T10:30:00+05:30",
        "name": "Aditya Suresh",
        "phoneNumber": "9568785458",
        "address": "Nedumkandam P.O, Idukki",
        "userDescription": "A major landslide at Nedumkandam, Idukki. Roads are fully blocked, all power sources are cut off. Many people trapped. We need urgent help.",
        "keywords": [
          "Landslide",
          "Road Blocked",
          "Power Outage",
          "People Trapped",
          "Urgent Help"
        ],
        "aiAnalysisAndRecommendations": "This incident is classified as high severity. Immediate intervention is required. Dispatch emergency response teams, clear road obstacles, restore power, and notify local authorities. Prioritize rescue operations for trapped individuals."
    } `
    })
    //    console.log(response);
    //    console.log(JSON.parse(response))

    //    return response
    // const aiResponse = response.candidates[0].content[0].parts[0].text
    const aiResponse = response.candidates[0].content.parts[0].text
    return aiResponse

}