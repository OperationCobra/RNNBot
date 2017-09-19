(function () {

    const DIRECTLINE_SECRET = process.env.DIRECTLINE_SECRET; //you get that from the direct line channel at dev.botframework.com
    const VAPID_PUBLICKEY = process.env.VAPID_PUBLICKEY; //you get that from the server, which will generate a vapidKey.json file

    var startChat = function () {
        let botConnection;

        if (getParameterByName("isback") === 'y') {

            //If we are resuming an existing conversation, we get back the conversationid from LocalStorage
            botConnection = new DirectLine.DirectLine({
                secret: DIRECTLINE_SECRET,
                conversationId: localStorage.getItem("pushsample.botConnection.conversationId"),
                webSocket: false
            });
        } else {

            //if it is a brand new conversation, we create a fresh one
            botConnection = new DirectLine.DirectLine({
                secret: DIRECTLINE_SECRET,
                webSocket: false
            });
        }

        botConnection.connectionStatus$
            .filter(s => s === 2) //when the status is 'connected' (2)
            .subscribe(c => {

                //everything is set up in DirectLine; we can create the Chatbot control
                BotChat.App({
                    botConnection: botConnection,
                    user: { id: botConnection.conversationId}, //you could define you own userid here
                    resize: 'detect'
                }, document.getElementById("bot"));

            });

        botConnection.activity$.subscribe(c => {

            //here is were you can get each activity's watermark
            //we do not do anything in this sample, but you can use it if you need
            //to restore history at resuming at a specific moment in the conversation
            console.log(botConnection.watermark);
        });
    };

    //everything is defined, let's start the chat
    startChat();
})();