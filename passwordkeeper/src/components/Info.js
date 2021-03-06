import React from 'react';
import { FiMail, FiUser } from "react-icons/fi";
// eslint-disable-next-line
import Styles from './Style.css';

function Info (){
    return (
      <div className="container">  
        <div id="contact">
          <h3>Contattaci</h3><br/>
          <h6><u>Sviluppatori: </u></h6><br/>
          <h6>
          <FiUser/> Andrea Falaschini<br/>
          <FiMail/> andrea.falaschini@studenti.unicam.it
          </h6><br/>
          <h6>
          <FiUser/> Diego Miccio <br/>
          <FiMail/> diego.miccio@studenti.unicam.it
          </h6><br/>
          <h6>
          <FiUser/> Matteo Guerrini <br/>
          <FiMail/> matteo.guerrini@studenti.unicam.it
          </h6> <br/>
          <h6><u>Email Progetto PAWM: </u></h6><br/>
          <h6>
          <FiMail/> progettoweb2019@gmail.com
          </h6>
        </div>
      </div>
    );
  
}

export default Info;
