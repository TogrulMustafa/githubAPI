class Github {
    constructor() {
        this.url = 'https://api.github.com/users/'
    }
    async getDataFromGithub(inputValue) {
        const firstRequest = await fetch(this.url + inputValue)
        const secondRequest = await fetch(this.url + inputValue + '/repos')

        const firstResp = await firstRequest.json()
        const secondResp = await secondRequest.json()
        return {
            user: firstResp,
            repos: secondResp
        }
    }
}