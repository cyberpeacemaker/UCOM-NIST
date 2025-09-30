let target_source = '../2-1.md';
function sayHello() {
    alert('Hello, world!');
}


function loadMarkdownContent() {
    fetch(target_source)
        .then(response => response.text())
        .then(text => {
            //document.getElementById('data-container').textContent = text;

            const html = marked.parse(text);
            document.getElementById('data-container').innerHTML = html;

        })
        .catch(error => {
            document.getElementById('data-container').textContent = 'Failed to load content.';
        });

    // Load and render the markdown file
    /*
    fetch('./A.md')
      .then(response => response.text())
      .then(mdText => {
        const html = marked.parse(mdText);
        document.getElementById('content').innerHTML = html;
      })
      .catch(error => {
        document.getElementById('content').textContent = 'Error loading markdown file.';
        console.error('Error:', error);
      });
      */


}

loadMarkdownContent();