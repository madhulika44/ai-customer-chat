AI-Powered Customer Support Chat Application. 

A full-stack AI-based customer support platform that allows users to chat with an intelligent assistant trained on company-specific FAQs and documents. Admins can upload custom FAQs, and the chatbot provides context-aware responses using Together.ai's Mixtral model.
LIVE DEMO LINKS : 
https://ai-chat-frontend-rf3t.onrender.com/

Tech Stack used : 

- Frontend : React.js
- Backend: Node.js, Express.js
- AI Model: Together.ai (`Mixtral-8x7B-Instruct`)
- Database: MongoDB Atlas
- Deployment: Render
- Styling: CSS (custom + responsive layout)

folder struture : 

ai-customer-chat/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.js
│   │   │   └── AdminUpload.js
│   │   └── App.js
│
├── server/              # Express backend
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   └── adminRoutes.js
│   ├── models/
│   │   ├── Conversation.js
│   │   └── Faq.js
│   └── index.js
│
├── .env 
└── README.md

steps to run locally : 
download the Clone repo
git clone https://github.com/madhulika44/ai-customer-chat.git

Run server : following commands 
cd server
npm install
node index.js

 Run client: following commands 
cd ../client
npm install
npm start

and aslo for faq A sample dummy_faq.txt file is provided in the repository to test the FAQ upload feature.

This project satisfies all the features mentioned in the task PDF:

--> Chat UI with bot/user messages
-->AI integration (Together.ai)
-->MongoDB conversation + FAQ storage
--> Admin file upload
--> Contextual responses using uploaded data
--> Deployment & Live Demo
--> Bonus features: Typing indicator, chat download



