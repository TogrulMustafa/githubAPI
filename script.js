const form = document.querySelector('#github-form')
const input = document.querySelector('#githubname')
const deleteLastSearches = document.querySelector('#clear-last-users')
const lastSearches = document.querySelector('#last-users')

eventListeners()


function eventListeners() {
    form.addEventListener('submit', getData)
    document.addEventListener('DOMContentLoaded', bringDataToUI)
    deleteLastSearches.addEventListener('click', clearLastSearches)
}


const github = new Github()
const ui = new UI()

function getData(e) {
    const inputValue = input.value.trim()

    if (inputValue === '') {
        ui.showMessage('Kullanici ismi giriniz...')
    } 
    else {
        github.getDataFromGithub(inputValue)
        .then(response => {
            if (response.user.message === 'Not Found') {
                ui.showMessage('Boyle bir kullanici ismi yok...')
            } 
            else {
                ui.getDataToUI(inputValue)
                Storage.addDataToStorage(inputValue)
                ui.showUser(response.user)
                ui.showRepos(response.repos)
            }
        })
        .catch(err => ui.showMessage(err))
    }
    
    ui.clearInput()
    e.preventDefault()
}



function bringDataToUI() {
    ui.showDataInUI()
}


function clearLastSearches() {
    ui.removeDataFromUI()
    Storage.removeDataFromStorage()
}