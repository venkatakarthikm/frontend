import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './card.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    to_name: 'WEB ADMIN',
    from_name: '',
    from_email: '',
    message: '',
  });

  const notifySuccess = (msg) => toast.success(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const notifyError = (msg) => toast.error(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { to_name, from_name, from_email, message } = formData;

    try {
      await emailjs.send(
        'service_1cgoroc',
        'template_5e30u0j',
        {
          to_name,
          from_name,
          from_email,
          message,
        },
        'yrzFX8drHSNIHQopc'
      );

      notifySuccess('Team will get in contact through Email!');
    } catch (error) {
      notifyError('Error sending email: ', error);
      notifyError('Error sending email. Please try again later.')
    }
  };

  return (
    <div className='coontainer'>
    <form onSubmit={handleSubmit} className="foorm">

    <label htmlFor="from_name" className="foorm__label">Your Name</label>
      <input
        type="text"
        name="from_name"
        placeholder="Your name"
        value={formData.from_name}
        onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
        required
        className="foorm__input"
      />
      
      
      <label htmlFor="from_email" className="foorm__label">Your Email</label>
      <input
        type="email"
        name="from_email"
        placeholder="Your email"
        required
        value={formData.from_email}
        onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
        className="foorm__input"
      />
      
      
      <label htmlFor="message" className="foorm__label">Your Message</label>
      <textarea
        name="message"
        placeholder="Your message"
        value={formData.message}
        required
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="foorm__input"
      />
      
      
      <button type="submit" className="foorm__submit">Send</button>
    </form>
    </div>
  );
};

export default Contact;
