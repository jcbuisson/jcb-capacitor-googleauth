import { GoogleAuth } from 'jcb-capacitor-googleauth';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    GoogleAuth.echo({ value: inputValue })
}
