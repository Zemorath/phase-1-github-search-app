let searchField = document.getElementById("github-form")

document.addEventListener("DOMContentLoaded", () => {
    let searchField = document.getElementById("github-form")

    searchField.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let value = data.get('search')
        

        fetch(`https://api.github.com/search/users?q=${value}`)
            .then(resp => resp.json())
            .then(data => renderResults(data))
    })
})

function renderResults(results) {
    let userList = document.getElementById("user-list");

    for (const result in results.items) {
        let user = results.items[result].login;
        let li = document.createElement('li');

        let img = document.createElement("img")
            img.setAttribute("src", results.items[result].avatar_url)
            img.setAttribute("height", "50");
            img.setAttribute("width", "50")

        let link = document.createElement("a")
            link.href = results.items[result].html_url
            link.innerHTML = results.items[result].login

        userList.appendChild(li)
        li.appendChild(img)
        li.appendChild(link)

        li.addEventListener("click", (event) => {
            event.preventDefault();
            fetch(`https://api.github.com/users/${user}/repos`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    let item = data.map(addRepos)
                })
        })
    }
};

function addRepos(repo) {
    let repoList = document.getElementById("repos-list")
    let repoListItem = document.createElement("li")
    repoListItem.innerText = repo.full_name
    repoList.appendChild(repoListItem);
}