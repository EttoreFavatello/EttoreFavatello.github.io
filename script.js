document.addEventListener('DOMContentLoaded', function () {
    const text = "Ettore Favatello";
    const target = document.getElementById('typed-name');
    if (!target) return;

    let pendulumRAF = null;
    const g_over_L = 32;
    const damping = 0.50;

    function startPendulum(element) {
        if (pendulumRAF) cancelAnimationFrame(pendulumRAF);

        let theta = Math.PI;
        let omega = 0.4;
        let lastTime = performance.now();

        function tick(now) {
            const dt = Math.min((now - lastTime) / 1000, 0.033);
            lastTime = now;

            const alpha = -g_over_L * Math.sin(theta) - damping * omega;
            omega += alpha * dt;
            theta += omega * dt;

            const cssAngle = (Math.PI - theta) * 180 / Math.PI;
            element.style.transform = 'rotate(' + cssAngle + 'deg)';

            pendulumRAF = requestAnimationFrame(tick);
        }

        pendulumRAF = requestAnimationFrame(tick);
    }

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            target.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 90);
        } else {
            const fullText = target.textContent;
            const lastOIndex = fullText.lastIndexOf('o');
            if (lastOIndex !== -1) {
                const before = fullText.substring(0, lastOIndex);
                const after = fullText.substring(lastOIndex + 1);
                target.innerHTML = before + '<span class="swinging-o" id="swinging-o-el">o</span>' + after;
                setTimeout(function () {
                    const oElement = document.getElementById('swinging-o-el');
                    if (oElement) startPendulum(oElement);
                }, 200);
            }
        }
    }

    setTimeout(typeWriter, 600);
});
