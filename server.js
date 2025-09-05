import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req,res)=>{
  const question = req.body.question;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions",{
      method:'POST',
      headers:{
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content: question}],
        max_tokens: 300
      })
    });
    const data = await response.json();
    const answer = data.choices[0].message.content;
    res.json({answer});
  } catch(err) {
    res.json({answer:"Sorry, something went wrong."});
  }
});

app.listen(process.env.PORT || 3000, ()=>console.log('Server running'));
