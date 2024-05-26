document.getElementById("search").addEventListener("click", function() {
    search();
});

function search() {
    const name = document.getElementById('name').value;
    const movie_title = document.getElementById('movie_title').value;
    const year = document.getElementById('year').value;
    const score = document.getElementById('score').value;
    const votes = document.getElementById('votes').value;

    fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, movie_title, year, score, votes })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}