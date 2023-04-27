document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const searchQuery = event.target.search.value;
  
      fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          userList.innerHTML = '';
          data.items.forEach(item => {
            const li = document.createElement('li');
            const username = document.createElement('span');
            const a = document.createElement('a');
            const img = document.createElement('img');
            a.href = item.html_url;
            a.textContent = 'GitHub Profile';
            username.textContent = item.login;
            img.src = item.avatar_url;
            img.alt = `${item.login}'s avatar`;
            li.appendChild(username);
            li.appendChild(document.createElement('br'));
            li.appendChild(a);
            li.appendChild(document.createElement('br'));
            li.appendChild(img);
            userList.appendChild(li);
            userList.appendChild(document.createElement('hr'));
  
            username.addEventListener('click', () => {
                fetch(`https://api.github.com/users/${item.login}/repos`, {
                 headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
                })
                .then(response => response.json())
                .then(data => {
                  userList.innerHTML = '';
                  data.forEach(repo => {
                    const repoLi = document.createElement('li');
                    const repoLink = document.createElement('a');
                    repoLink.href = repo.html_url;
                    repoLink.textContent = repo.full_name;
                    repoLi.appendChild(repoLink);
                    userList.appendChild(repoLi);
                  });
                })
                .catch(error => console.error(error));
            });
          });
        })
        .catch(error => console.error(error));
    });
  });