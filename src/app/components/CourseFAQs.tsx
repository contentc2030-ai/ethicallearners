import React from "react";
import FAQ from "./FAQs";

// FAQ data for different courses
const courseFAQData = {
  CyberSecurity: [
    { question: "What is Cybersecurity?", answer: "Cybersecurity is the practice of protecting systems and data from digital attacks." },
    { question: "Why is cybersecurity important?", answer: "Cybersecurity is essential to safeguard sensitive data and prevent unauthorized access." },
    { question: "What are the common cybersecurity threats?", answer: "Common threats include malware, phishing, ransomware, and DDoS attacks." },
    { question: "How can I start a career in cybersecurity?", answer: "Learn the basics, pursue certifications, and gain practical experience." },
    { question: "What are the best certifications for cybersecurity?", answer: "Certifications like CISSP, CEH, and CompTIA Security+ are widely recognized." },
    { question: "What is ethical hacking?", answer: "Ethical hacking involves identifying vulnerabilities in systems with permission to improve security." },
    { question: "What tools are used in cybersecurity?", answer: "Tools like Wireshark, Metasploit, and Nessus are commonly used." },
    { question: "How do I protect my personal information online?", answer: "Use strong passwords, enable two-factor authentication, and avoid sharing sensitive information." },
  ],

  DataScience: [
    { question: "What is Data Science?", answer: "Data Science involves analyzing and interpreting complex data to extract meaningful insights." },
    { question: "Why is data science important?", answer: "Data science helps organizations make data-driven decisions and improve efficiency." },
    { question: "What tools are used in Data Science?", answer: "Tools like Python, R, Jupyter Notebook, and Tableau are widely used." },
    { question: "How do I start learning Data Science?", answer: "Begin with foundational statistics, learn Python or R, and explore data manipulation libraries." },
  ],
  Campus: [
    { "question": "What is the goal of campus training?", "answer": "Campus training prepares students with industry-relevant skills to enhance their career prospects." },
    { "question": "Who can enroll in the campus training program?", "answer": "Any student from the partnered institution is eligible, typically in their final or pre-final year." },
    { "question": "What topics are covered in the training?", "answer": "Topics include Data Science, Web Development, Artificial Intelligence, Cybersecurity, and more." },
    { "question": "How is the training delivered?", "answer": "The training is delivered through interactive live sessions, hands-on projects, and recorded modules." },
    { "question": "Are certifications provided after completing the training?", "answer": "Yes, students receive a certificate of completion that is industry-recognized." },
    { "question": "How long does the campus training program last?", "answer": "The duration typically ranges from 4 to 12 weeks, depending on the chosen course." },
    { "question": "Are there any prerequisites for joining the training?", "answer": "Basic knowledge of the subject is helpful but not mandatory as foundational concepts are covered." },
    { "question": "Will the training include real-world projects?", "answer": "Yes, the training includes industry-aligned projects to help students apply their knowledge practically." },
    { "question": "Is placement assistance provided after training?", "answer": "Yes, placement support includes resume building, interview preparation, and job referrals." },
    { "question": "How can I enroll in the campus training program?", "answer": "You can enroll through your institution's training coordinator or via the program's official website." }
  ],
  Corporate: [
    { "question": "What is corporate training?", "answer": "Corporate training equips employees with the skills and knowledge needed to improve workplace performance and efficiency." },
    { "question": "Who is corporate training designed for?", "answer": "It is designed for professionals at all levels, from entry-level employees to senior management." },
    { "question": "What topics are covered in corporate training?", "answer": "Topics include leadership, Data Science, Artificial Intelligence, cybersecurity, soft skills, and project management." },
    { "question": "How is corporate training delivered?", "answer": "It can be delivered through live virtual sessions, in-person workshops, self-paced courses, or a hybrid model." },
    { "question": "Is the training customizable to our company's needs?", "answer": "Yes, corporate training programs are often tailored to align with the company’s goals and industry requirements." },
    { "question": "What are the benefits of corporate training?", "answer": "It improves employee performance, boosts morale, and keeps skills updated with industry trends." },
    { "question": "How long does corporate training typically last?", "answer": "The duration can range from one-day workshops to multi-week programs, depending on the topic and company needs." },
    { "question": "Do participants receive certifications?", "answer": "Yes, participants often receive certifications that validate their skills and training completion." },
    { "question": "Can training be conducted remotely for distributed teams?", "answer": "Yes, most corporate training programs support remote delivery to accommodate distributed teams." },
    { "question": "How do we get started with corporate training for our organization?", "answer": "You can contact the training provider to discuss your requirements, customize a program, and schedule sessions." }
  ],
  
  
};

interface CourseFAQsProps {
  course: keyof typeof courseFAQData; // Restrict to valid course keyss
}

const CourseFAQs: React.FC<CourseFAQsProps> = ({ course }) => {
  const faqData = courseFAQData[course];

  if (!faqData) {
    return <p>No FAQs available for this course.</p>;
  }

  return (
    <div className="mt-12">
     
      <FAQ  />
    </div>
  );
};

export default CourseFAQs;
