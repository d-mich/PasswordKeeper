import React, { Component } from 'react';

let cipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
    let applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code)    

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('')
}

let decipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let saltChars = textToChars(salt)
    let applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code)
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('')
}

class Security extends Component {
    constructor() {
        super()
    }

    render () {

        //creazione la chiave di criptatura
        let myCipher = cipher('mySecretSalt')
        let myDecipher = decipher('mySecretSalt')


        return(
            <div>

                <h2>Criptata: {myCipher('SONO UN ELEFANTE')}</h2>
                <h2>Decriptata: {myDecipher("5b474647285d46284d444d4e49465c4d") }</h2>
                <h2>CriptaeDecripta: {myDecipher(myCipher('IO CAMBIO COME ME PARE')) }</h2>
            </div>    
        )
    }
}





export default Security;