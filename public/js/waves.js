document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 200;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  let waveOffset = 0;
  
  function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // First wave
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let x = 0; x <= canvas.width; x += 5){
      const y = 30 * Math.sin((x + waveOffset) * 0.01) + canvas.height * 0.7;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = 'rgba(2, 136, 209, 0.6)';
    ctx.fill();
    
    // Second wave
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let x = 0; x <= canvas.width; x += 5){
      const y = 20 * Math.sin((x + waveOffset * 1.5) * 0.015) + canvas.height * 0.8;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = 'rgba(6, 66, 115, 0.8)';
    ctx.fill();
    
    waveOffset += 1;
    requestAnimationFrame(drawWave);
  }
  
  drawWave();
});
