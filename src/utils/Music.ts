
export class Music {
    createAudio(tempURL:string="attack.mp3"){
        let audio = document.createElement("audio");
        // audio.muted = true;
        audio.src = "./music/" + tempURL;
        return audio;
    }
}
