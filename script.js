const colorPicker = document.getElementById('colorPicker');
const selectedColor = document.getElementById('selectedColor');
const colorCombinationsDiv = document.getElementById('color-combinations');

colorPicker.addEventListener('input', () => {
  selectedColor.style.backgroundColor = colorPicker.value;
});

async function sendColor() {
  const color = colorPicker.value;
  const apiKey = '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'; // Replace with your Groq AI API key
  const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Replace with your Groq AI API URL

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `Provide color combinations for ${color}`
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayColorCombinations(data.combinations);
  } catch (error) {
    console.error('Error fetching data from Groq AI API:', error);
  }
}

function displayColorCombinations(combinations) {
  colorCombinationsDiv.innerHTML = '';
  combinations.forEach(combination => {
    const combinationDiv = document.createElement('div');
    combinationDiv.classList.add('combination');
    combination.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.style.backgroundColor = color;
      combinationDiv.appendChild(colorDiv);
    });
    colorCombinationsDiv.appendChild(combinationDiv);
  });
}
