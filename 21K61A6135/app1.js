// app1.js
const data = [
  { name: 'iphone', url: 'https://support.apple.com/en-in/HT201299' },
  { name: 'moto', url: 'https://www.motorola.in/smartphones' },
  { name: 'realme', url: 'https://www.realme.com/in/' },
  { name: 'samsung', url: 'https://www.samsung.com/in/offer/online/samsung-fest/' },
  { name: 'oppo', url: 'https://www.oppo.com/in/' },
  { name: 'vivo', url: 'https://www.flipkart.com/vivo-mobile-phones-store' }
  // Add more data as needed
];

function filterResults() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const resultList = document.getElementById('result-list');

  // Clear previous results
  resultList.innerHTML = '';

  // Filter data based on search term
  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));

  // Display filtered results
  filteredData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('result-item');

    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank'; // Open link in a new tab

    const textNode = document.createTextNode(item.name);
    link.appendChild(textNode);

    listItem.appendChild(link);
    resultList.appendChild(listItem);
    saveSearchHistory(item.name);
  });
}

function saveSearchHistory(searchTerm) {
  fetch('http://localhost:3000/api/search-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchTerm }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error saving search history:', error));
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    const firstResultLink = document.querySelector('.result-item a');

    if (firstResultLink) {
      window.open(firstResultLink.href, '_blank');
    }
  }
}
