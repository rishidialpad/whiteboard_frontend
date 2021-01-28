<template>
    <div>
        <div class="frame">
        </div>
        <!-- <button v-if="isWhiteboardOpen == false" v-on:click="openWhiteboard" ><i class="fas fa-desktop fa-3x"></i></button>
        <button v-else v-on:click="closeWhiteboard"><i class="fas fa-stop-circle"></i></button> -->
        <b-dropdown v-if="isWhiteboardOpen == false" id="dropdown-offset" offset="25" text="Share Screen" class="m-2">
          <b-dropdown-item v-on:click="openWhiteboard">Open Miro whiteboard</b-dropdown-item>
          <b-dropdown-item href="#" disabled>Share Desktop Screen</b-dropdown-item>
        </b-dropdown>
        <button v-else v-on:click="closeWhiteboard"><i class="fas fa-stop-circle fa-3x"></i></button>
        <!-- <textarea class="results"></textarea> -->
    </div>
</template>

<script src="https://miro.com/app/static/boardsPicker.1.0.js"></script>

<script>
export default {
  name: 'Sharescreen',
  data: function () {
    return {
        wsConnection : Object,
        isWhiteboardOpen:false,
    }
  },
  mounted() {
    this.wsConnection = new WebSocket('wss://whiteboard-server1.herokuapp.com', 'json');
    this.wsConnection.onopen = (e) => {
        console.log(`wsConnection open to 127.0.0.1:8081`, e);
        };
    this.wsConnection.onerror = (e) => {
        console.error(`wsConnection error `, e);
        };
    this.wsConnection.onmessage = (e) => {
        let data = JSON.parse(e.data);
        switch (data.type) {
            case 'connection':
                this.localId = data.id;
                break;
            case 'ids':
                console.log(data);
                this.peerIds = data.ids;
                // connect();
                break;
            case 'signal':
                // signal(data.id, data.data);
                break;
            case 'whiteboard':
              console.log(data);
              var insertFrame = document.querySelector('.frame')

              if(data.enable == true){
                insertFrame.innerHTML = data.value;
                this.isWhiteboardOpen = true;
              }
              else{
                insertFrame.innerHTML = "";
                this.isWhiteboardOpen = false;
              }
              
            }
        };
  },
  methods:{
      openWhiteboard: function(){
          //this.getWhiteboardLink();
          // var resultsBox = document.querySelector('.results')
          var insertFrame = document.querySelector('.frame')
          miroBoardsPicker.open({
            clientId: '3074457353059286897', // Replace it with your app ClientId
            action : "access-link",
            allowCreateAnonymousBoards : true,
            getToken : () => this.getTokenFromServer(),
            success: (data) => {
            insertFrame.innerHTML = data.embedHtml;
            // resultsBox.innerHTML = JSON.stringify(data, null, 4)
            // resultsBox.style.display = "block"
            this.isWhiteboardOpen = true;
            this.wsConnection.send(JSON.stringify({
                "type":"whiteboard",
                "enable":true,
                "value":data.embedHtml
            }));
            
          }
          
        })
        
        },
        closeWhiteboard: function(){
          // do something
          var insertFrame = document.querySelector('.frame')
          insertFrame.innerHTML = "";
          this.isWhiteboardOpen = false;
            this.wsConnection.send(JSON.stringify({
                "type":"whiteboard",
                "enable":false,
                "value":""
            }));
        },
      getTokenFromServer : function(){
        return new Promise(function(res,err){
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("https://whiteboard-frontend-poc.herokuapp.com/getToken", requestOptions)
            .then(response => response.text())
            .then(result => 
            {console.log(JSON.parse(result).token),res(JSON.parse(result).token)})
            .catch(error => err(error));
            
            
        });
      },
  }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.frame{
    width : 98%;
    height : 83vh;
    margin : .5em .5em .5em .5em;
    
}
button{
  width:50px;
  height:50px;
  padding: 0px;
  border: 0rem;
  background-color: white;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
