async function* listMessages(folder) {
    let page = await messenger.messages.list(folder);
    for (let message of page.messages) {
        yield message;
    }

    while (page.id) {
        page = await messenger.messages.continueList(page.id);
        for (let message of page.messages) {
            yield message;
        }
    }
}

async function load() {
    let accounts = await messenger.accounts.list();
    let folder = accounts[1].folders[2];

    let messages = listMessages(folder);

    for await (let message of messages) {
        // Do something with the message.
        console.log(message);
    }

}

document.addEventListener("DOMContentLoaded", load);