function submitData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const subject = document.getElementById('inputSubject').value;
    const Message = document.getElementById('Message').value;

    if (name === "") {
        alert('Nama harus diisi');
    } else if (email === "") {
        alert('Email harus diisi');
    } else if (phoneNumber === "") {
        alert('Phone number harus diisi');
    } else if (subject === "") {
        alert('Subject harus diisi');
    } else if (Message === "") {
        alert('Message harus diisi');
    } else {
        
        console.log(`Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nSubject: ${subject}\nMessage: ${Message}`);

         const mailtoURL = `mailto:rizkimuhamad953@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(Message)}`;

         window.location.href = mailtoURL;
    }

}
