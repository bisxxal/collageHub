import toast from "react-hot-toast";

export const sendEmailNode = async ({email,message , subject}:{email:string,message:string , subject:string}) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: subject,    // Subject of the email
          text: message,
          html: `<p>${message}</p>`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Email sent successfully!');
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      toast.error('Error sending email');
    }
  };