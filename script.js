document.addEventListener('DOMContentLoaded', function () {
    const text = "Ettore Favatello";
    const target = document.getElementById('typed-name');
    if (!target) return;

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            target.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 90);
        }
    }

    setTimeout(typeWriter, 600);
});
