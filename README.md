# 📧 Visual Email Sequence Builder

A full-stack MERN application that allows users to create and automate email sequences using a visual flowchart builder. This tool is designed for sales and marketing teams to build drip campaigns and schedule emails with ease.

---

## 🔍 Overview

Users can visually design email campaigns by dragging and dropping the following node types:

- 📨 Cold Email
- ⏱️ Wait/Delay
- 🔗 Lead Source

Based on the flowchart and timing configuration, emails are scheduled and sent automatically using backend scheduling logic.

---

## 💻 Tech Stack

- **Frontend:** React, React Flow  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Scheduler:** Agenda  
- **Email Service:** Nodemailer  

---

## 🎯 Features

### Frontend

- Built with **React Flow**
- Drag-and-drop interface to create email workflows
- Supports three node types:
  - **Cold Email** node to configure email content
  - **Wait/Delay** node to set time intervals
  - **Lead Source** node to initiate the sequence
- Automatically saves the flow
- Sends data to backend for scheduling
- Used gemini ai for email body creation.


### Backend

- `[POST] /api/flow` API
- Accepts:
  - Email Flow Details
- Uses **Agenda** to schedule the job after the given delay
- Uses **Nodemailer** to send the email at the right time
- Added Authentication using jwt tokens.


## 📦 Deployment

- 🔗 **Frontend Live Link:** https://email-flow.vercel.app/login
- 🔗 **Backend Live API:** https://email-flow-1-nrla.onrender com/
- 📂 **GitHub Repo:** https://github.com/Code12Git/Email-Flow


---

## 📘 Reference Example

- [SalesBlink Signup](https://run.salesblink.io/signup)
- [SalesBlink Sequence Creator Docs](https://help.salesblink.io/en/articles/9080591-sequence-creator)

---

## 📚 Resources Used

- React Flow → https://reactflow.dev/learn  
- Agenda → https://github.com/agenda/agenda  
- Nodemailer → https://www.nodemailer.com/usage

---

## 👤 Author

**saksham**  
Feel free to connect or reach out for collaboration!

