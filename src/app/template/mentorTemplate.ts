

  export const registerMentor = (name, email, phoneNumber) => { 
    return `
    <div style="background-color: #0b1120; color: #ffffff; padding: 40px; border-radius: 8px; font-family: Arial, sans-serif; text-align: center;">
      
      <!-- Logo Section -->
      <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://media.licdn.com/dms/image/v2/D4D0BAQELaHc7ygx3MQ/company-logo_200_200/company-logo_200_200/0/1738225984313/ethical_learner_logo?e=1749686400&v=beta&t=B9RdoBRjAstgiTRh2WF5fCxwPTMNUu3vEZ33ep2lBA8" alt="Company Logo" style="max-width: 150px;">
      </div>
  
      <h2 style="color: #00bcd4; font-size: 24px; margin-bottom: 10px;">🚀 New Mentor Registration Request</h2>
      <p style="font-size: 16px; color: #b0c4de;">A new mentor has requested to join the platform. Below are their details:</p>
  
      <!-- Mentor Details Card -->
      <div style="background: linear-gradient(135deg, #1a2a44, #142135); padding: 20px; border-radius: 12px; text-align: left; max-width: 450px; margin: 20px auto; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);">
        <p style="margin: 8px 0; font-size: 16px;"><strong style="color: #00bcd4;">👤 Name:</strong> ${name}</p>
        <p style="margin: 8px 0; font-size: 16px;"><strong style="color: #00bcd4;">📧 Email:</strong> <a href="mailto:${email}" style="color: #4fc3f7; text-decoration: none;">${email}</a></p>
        <p style="margin: 8px 0; font-size: 16px;"><strong style="color: #00bcd4;">📞 Phone Number:</strong> ${phoneNumber}</p>
      </div>
  
      <p style="margin-top: 20px; font-size: 15px; color: #b0c4de;">Please review and take the necessary action:</p>
  
      <!-- Accept & Reject Buttons -->
      <div style="margin-top: 20px;">
        <a href="https://ethical-learner.vercel.app/api/mentor/acceptMentor?email=${email}&status=accepted" 
           style="display: inline-block; background: linear-gradient(135deg, #00c853, #009688); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin-right: 10px; box-shadow: 0px 4px 8px rgba(0, 255, 127, 0.2);">
           ✅ Accept
        </a>
        <a href="https://ethical-learner.vercel.app/api/mentor/acceptMentor?email=${email}&status=rejected" 
           style="display: inline-block; background: linear-gradient(135deg, #e53935, #d32f2f); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0px 4px 8px rgba(255, 0, 0, 0.2);">
           ❌ Reject
        </a>
      </div>
  
      <p style="margin-top: 30px; font-size: 14px; color: #b0c4de;">If you have any questions, please contact support.</p>
      
    </div>`;
  }
  