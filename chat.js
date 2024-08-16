class ChatUser {
    constructor(username, avatar = 'https://i.pravatar.cc/300?u=' + username) {
        
        this.username = username ?? 'anon';
        this.avatar = avatar;
    }
}

class ChatMessage {
    constructor(message, user) {
        this.user = user;
        this.message = message;
        this.time = new Date().getTime();
    }
}

class Chat {
    constructor(username, avatar = 'https://i.pravatar.cc/300?u=' + username) {
        this.user = new ChatUser(username, avatar);
        this.db = new FbDb();
        this.channel = 'messages';
        this.avatar = avatar;
    }

    getMessageTemplate(message) {
        return `
                <div class="message animate__animated animate__slideInRight">
                    <img src="${message.user.avatar}">
                    <div>
                        <strong>${message.user.username}</strong>
                        <code>ID:${message.time}</code>
                        <div><p>${message.message}</p></div>
                        <a class="pv" onclick="changeChannel('${message.user.username}', '${message.user.username}')">Napisz do mnie!</a>

                        
                    </div>
                </div>
        `;
    }
    addChannel(name, description, img) {
        const data = {
            topic: "Hyde Park", name, description, img
        }
        this.db.set('channels/' + name, data);
        const payload = new ChatMessage("Hej!", this.user);
        this.db.push(name, payload);
    }

    getChannelsTemplate(channel){
        return `
        <li onclick="changeChannel('${channel.name}', '${channel.topic}')">
                    <img src="https://img.icons8.com/?size=100&id=${channel.img}&format=png&color=ffffff"
                        alt="Avatar użytkownika">
                    <span>${channel.name}<br /><small>${channel.description}</small></span>
                </li>
        `;
    }

    getChannelsList() {

        this.db.addListener("channels", data=>{

            const channels = document.getElementById("channels");
            const keys = Object.keys(data);
            const tpl = this.getChannelsTemplate;

            channels.innerHTML = keys.map(key => {
                const item = data[key];
                return tpl(item);
            }).join(' ');
        })

    }

    init(channel = 'messages') {
        this.channel = channel;

        const Chat = document.querySelector('#Chat');
        const ChatMessageIntpu = document.querySelector('#sendingMessage');
        const ChatMessageSendBtn = document.querySelector('#send');

        this.db.addListener(this.channel, data => {
            const keys = Object.keys(data);
            const tpl = this.getMessageTemplate;

            Chat.innerHTML = keys.map(key => {
                const item = data[key];
                return tpl(item);
            }).join(' ');

            Chat.scrollTop += 2000;
        });

        const sendMessage = message => {
            if (message.trim().length < 1) {
                return;
            }

            const payload = new ChatMessage(message, this.user);
            this.db.push(this.channel, payload);
            ChatMessageIntpu.value = '';
        }

        ChatMessageIntpu.addEventListener('keyup', e => {
            if (e.keyCode == 13) {
                sendMessage(ChatMessageIntpu.value);
            }
        });

        ChatMessageSendBtn.addEventListener('click', e => {
            sendMessage(ChatMessageIntpu.value);
        });
    }
}