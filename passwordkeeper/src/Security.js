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
        console.log("CRIPTAZIONE: "+myCipher)

        //criptazione
        myCipher('the secret string')   // --> "7c606d287b6d6b7a6d7c287b7c7a61666f"
        console.log("CRIPTAZIONE: "+myCipher)
        
        //To decipher, you need to create a decipher and use it:
        let myDecipher = decipher('mySecretSalt')

        myDecipher("7c606d287b6d6b7a6d7c287b7c7a61666f") 

        return(
            <div>
                <h2>Parola: the secret string</h2>
                <h2>Criptata: {myCipher.salt}</h2>
                <h2>Parola: the secret string</h2>
            </div>    
        )
    }
}





export default Security;