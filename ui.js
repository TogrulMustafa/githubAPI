class UI {
    constructor() {
        this.profileEl = document.querySelector('#profile');
        this.reposEl = document.querySelector('#repos');
        this.inputValue = document.querySelector('#githubname');
        this.lastSearches = document.querySelector('#last-users')
        this.cardBody = document.querySelector('.card-body')
    }

    clearInput() {
        this.inputValue.value = ''
    }

    showUser(user) {
        this.profileEl.innerHTML = 
        `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                        <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                        <hr>
                        <div id="fullName"><strong>${user.name}</strong></div>
                        <hr>
                        <div id="bio">${user.bio}</div>
                    </div>
                    <div class="col-md-8">
                        <button class="btn btn-secondary">
                            Takipçi  <span class="badge badge-light">${user.followers}</span>
                        </button>
                        <button class="btn btn-info">
                            Takip Edilen  <span class="badge badge-light">${user.following}</span>
                        </button>
                        <button class="btn btn-danger">
                            Repolar  <span class="badge badge-light">${user.public_repos}</span>
                        </button>
                        <hr>
                        <ul class="list-group">
                            <li class="list-group-item borderzero">
                                <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/location.png" width="30px"><span id = "location">${user.location}</span>
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/mail.png" width="30px"><span id="mail">${user.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }


    showRepos(repos) {
        this.reposEl.innerHTML = ''

        repos.forEach(repo => {
            this.reposEl.innerHTML += 
            `
            <div class="mb-2 card-body">
                <div class="row">
                    <div class="col-md-2">
                        <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Starlar<span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                            </button>
                            <button class="btn btn-info">
                                Forklar<span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                            </button>
                    </div>
                </div>
            </div>
            `
        });
    }

    getDataToUI(user) {
        let users = Storage.getAllDataFromStorage()

        if (users.indexOf(user) === -1) {
            const liEl = document.createElement('li')

            liEl.className = 'list-group-item'
            liEl.textContent = user

            this.lastSearches.appendChild(liEl)
        }
    }


    showDataInUI() {
        let users = Storage.getAllDataFromStorage()

        let result = ''
        users.forEach(user => {
            result += `<li class="list-group-item">${user}</li>`
        });

        this.lastSearches.innerHTML = result
    }

    removeDataFromUI() {
        if (confirm('Eminmisiniz?')) {
            while (this.lastSearches.firstElementChild !== null) {
                this.lastSearches.removeChild(this.lastSearches.firstElementChild)
            }
        }
    }

    showMessage(message) {
        const div = document.createElement('div')

        div.className = 'alert alert-danger'
        div.textContent = message

        this.cardBody.appendChild(div)

        setTimeout(_ => {
            div.remove()
        },2000)
    }

    
}