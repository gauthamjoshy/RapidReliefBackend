const { analyzeReport } = require("../service/geminiService");

exports.testAIController = async (req, res)=>{
    console.log(`inside testAIController`);
    try{
        const fakeReport = {
            location:"Idukki, Kerala",
            name:"Aditya Suresh",
            pNum:"9568785458",
            address:"Nedumkandam p.o Idukki",
            description:"A major landslide at Nedumkandam, Idukki. Roads are fully blocked, all power sources are cut off.Many people trapped, we need urgent help",
        }

        const AIAnalysisResult = await analyzeReport(fakeReport, req.files)
        const parsedResult = JSON.parse(AIAnalysisResult)
        res.status(200).json(parsedResult)

    }catch (error) {
  console.error("AI TEST ERROR:", error);
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message || error
  });
}

    
}