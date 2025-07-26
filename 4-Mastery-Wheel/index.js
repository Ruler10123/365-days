async function loadMasteryData() {
    try {
      const response = await fetch('mastery.txt');
      if (!response.ok) throw new Error('Network response was not ok');
      const text = await response.text();
      return text.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  
  function buildWheel(sections) {
    const step = 360 / sections.length;
    let currentAngle = 0;
    const colors = ['red', 'yellow', 'green', 'blue', 'orange', 'purple', 'pink', 'cyan'];
  
    let gradient = 'conic-gradient(';
  
    sections.forEach((section, index) => {
      const color = colors[index % colors.length]; // loop colors if needed
      gradient += `${color} ${currentAngle}deg ${currentAngle + step}deg, `;
      currentAngle += step;
    });
  
    gradient = gradient.slice(0, -2) + ')'; // remove last comma and close
  
    const wheel = document.getElementById('wheel');
    wheel.style.background = gradient;
  }

  
  const wheel = document.getElementById("wheel");
  const spinButton = document.getElementById("spinButton");
  
  async function setupWheel() {
    const sections = await loadMasteryData();
    buildWheel(sections);
  
    spinButton.addEventListener("click", () => {
      wheel.style.transition = 'transform 0s';
      wheel.style.transform = `rotate(0deg)`;
      wheel.offsetHeight;
  
      const randomDeg = Math.floor(Math.random() * 2160) + 3000;
      wheel.style.transition = 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)';
      wheel.style.transform = `rotate(${randomDeg}deg)`;
  
      spinButton.disabled = true;
      spinButton.style.backgroundColor = '#888';
      spinButton.style.cursor = 'not-allowed';
      spinButton.textContent = 'Spinning...';
  
      setTimeout(() => {
        spinButton.disabled = false;
        spinButton.style.backgroundColor = '#333';
        spinButton.style.cursor = 'pointer';
        spinButton.textContent = 'Spin the Wheel!';
      }, 6000);
    });
  }
  
  setupWheel();
  