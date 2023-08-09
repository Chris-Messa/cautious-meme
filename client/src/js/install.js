const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {

    window.defferedPrompt = event

    butInstall.classList.toggle('hidden', false)
});

butInstall.addEventListener('click', async () => {
    console.log("clicked button")
    const promptEvent = window.defferedPrompt
    if (!promptEvent) {
        return
    }

    promptEvent.prompt()

    window.defferedPrompt = null

    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    window.defferedPrompt = null
});
