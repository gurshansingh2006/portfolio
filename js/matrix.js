// Full-page Matrix rain background
(() => {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const fontSize = 16;
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let columns = Math.floor(width / fontSize / 1.3); // reduce density
  let drops = Array(columns).fill(1);

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize / 1.3); // match reduced density on resize
    drops = Array(columns).fill(1);
  };

  window.addEventListener('resize', resize);

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.font = `${fontSize}px 'SFMono-Regular', Consolas, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i] += Math.random() * 0.5 + 0.5;
    }

    requestAnimationFrame(draw);
  };

  draw();
})();
