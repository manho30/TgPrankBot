botToken = "Your Bot Token";
debug_id =Number("your id")
const postTelegram = async (payload) => {
    const data = {
        'contentType': 'application/json',
        "method": "post",
        "muteHttpExceptions": true,
        "payload": JSON.stringify(payload)
    };
    var response, res;
    try {
        response = await UrlFetchApp.fetch("https://api.telegram.org/bot" + botToken + "/", data);
        res = JSON.parse(response);
        Logger.log(res)
        return res;
    } catch (e) {
        return `{e}`
    }
}

const testApi = () => {
    var payload = {
        "method": "sendMessage",
        "chat_id": debug_id,
        "text": "Hello World",
    }
    postTelegram(payload)
}

const doPost = (e) => {
    var body = JSON.parse(e.postData.contents);
    var payload = bot(body);
    if (Array.isArray(payload)) {
        payloads = payload;
    } else {
        payloads = [payload]
    }
    for (var i = 0; i < payloads.length; i++) {
        payload = payloads[i];
        if (payload) {
            var res = postTelegram(payload);
        }
    }
}

const bot = (bot) => {
    if(body.message.text.indexOf("腹肌") >= 0){
        const wait_action = postTelegram(sendChatAction(body.message.chat.id, "typing"));
        const wait_photo = postTelegram(sendMessage(body.message.chat.id, "腹肌照生成中"));
        const wait_delete = postTelegram(deleteMsg(wait_photo.result.chat.id, wait_photo.result.message_id));
        return [sendChatAction(body.message.chat.id, "upload_photo"), sendPhoto(body.message.chat.id, "")];
    }
} 

const sendMessage = (chat_id, text) => {
    return {
        "method": "sendMessage",
        "chat_id": chat_id,
        "parse_mode": "Markdown",
        "text": text
    }
};

const sendPhoto = (id, pic) => {
    return {
        "method": "sendPhoto",
        "chat_id": id,
        "photo": pic
    } 
};

const sendChatAction = (chat_id, action) => {
    return {
        "method": "sendChatAction",
        "chat_id": chat_id,
        "action": action
    } 
}

const deleteMsg = (chat_id, msg_id) => {
    return {
        "method": "deleteMessage",
        "chat_id": `${chat_id}`,
        "message_id": `${msg_id}`
    }
};
