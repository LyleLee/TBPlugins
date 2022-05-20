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
        //console.log(message);
    }


    let page = await messenger.messages.query({ fromDate: new Date('2021-01-01') });
    // Do something with page.messages.

    console.log(page);

    while (page.id) {
        page = await messenger.messages.continueList(page.id);
        console.log(page);
        // Do something with page.messages.
    }

}

document.addEventListener("DOMContentLoaded", load);