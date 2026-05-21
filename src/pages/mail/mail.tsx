import "./mail.css";
import emailjs from '@emailjs/browser';
import { useState } from 'react';

import { LuSend } from "react-icons/lu";
function Mail() {
  const [object, setObject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const templateParams = {
    user_email: email,
    object: object,
    time: new Date().toLocaleString(),
    name: name,
    message: message,
  };

  const sendEmail = async () => {
    if (!object || !email || !message || !name) {
      alert('Veuillez remplir tous les champs avant d\'envoyer le message.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      alert('Message envoyé avec succès !');
      setObject('');
      setEmail('');
      setMessage('');
      setName('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
    }
  };

  return (
    <>
      <div className="mailContainer">
        <LuSend className="sendMailLogo" onClick={sendEmail}/>
        <div className="field">
          <div className="fieldTitle">À :</div>
          <input className="fieldInput" type="text" defaultValue="lilian.davezac@gmail.com" readOnly/>
        </div>
        <div className="horizontalBar"></div>
        <div className="field">
          <div className="fieldTitle">Objet :</div>
          <input className="fieldInput" type="text" name="object" onChange={(e) => setObject(e.target.value)} required/>
        </div>
        <div className="horizontalBar"></div>
        <div className="field">
          <div className="fieldTitle">Name :</div>
          <input className="fieldInput" type="text" name="name" onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div className="horizontalBar"></div>
        <div className="field">
          <div className="fieldTitle">De :</div>
          <input className="fieldInput" type="email" name="userEmail" onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="horizontalBar"></div>
        <div className="lastField">
          <textarea className="textareaInput" name="message" onChange={(e) => setMessage(e.target.value)} required/>
        </div>
      </div>
    </>
  );
};


export default Mail;