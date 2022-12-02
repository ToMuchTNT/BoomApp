const APP_ID = '03c16643bcf841a5955a9e798819ac68'
const CHANNEL = sessionStorage.getItem('room')
const TOKEN = sessionStorage.getItem('token')
let UID = Number(sessionStorage.getItem('UID'))

console.log("Working")

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = [

]

let remoteUsers = {

}

let usersname = sessionStorage.getItem('username')

let userJoinFunction = async (user, mediaType) => {
    remoteUsers[user.UID] = user
    await client.subscribe(user, mediaType)

    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.UID}`)
        if(player != null){
            player.remove()
        }
        player = `<div class="video-container" id="user-container-${user.UID}">
                    <div class="username-wrapper">
                        <span class="user-name">(Name)</span>
                    </div>
                    <div class="video-player" id="user-${user.UID}"></div>
                </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play(`user-${user.UID}`)
    }

    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let userLeaveFunction = async (user) => {
    delete remoteUsers[user.UID]
    document.getElementById(`user-container-${user.UID}`).remove()
}

let joinAndDisplayLocalStream = async () => {
    document.getElementById('room-name').innerText = CHANNEL

   client.on('user-published', userJoinFunction)
   client.on('user-left', userLeaveFunction)
   


   await client.join(APP_ID, CHANNEL, TOKEN, UID)

   localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

   let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper">
                        <span class="user-name">${usersname}</span>
                    </div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let leaveRoom = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    window.open('/', '_self')
    console.log('LEAVE')
}

let hangUp = document.getElementById('hang-up-button')

hangUp.addEventListener('click', leaveRoom)

joinAndDisplayLocalStream()

let TurnOffCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = 'white'
    }else{
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = 'red'
    }
}

let TurnOffMic = async (e) => {
    if(localTracks[0].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = 'white'
    }else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = 'red'
    }
}

let cameraButton = document.getElementById("camera-button")
let micButton = document.getElementById("mic-button")
cameraButton.addEventListener("click", TurnOffCamera)
micButton.addEventListener("click", TurnOffMic)


