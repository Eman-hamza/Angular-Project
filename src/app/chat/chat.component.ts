import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { ChatDTO } from 'src/app/ChatDTO';
// import { IUser } from '../iuser';
// import { UserChats } from '../user-chats';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../Services/auth.service';
import { Ichat } from '../Interface,enum/Chat';
import { User } from '../Interface,enum/User';
// import { EmojiService } from 'ng-emoji-picker';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user: ChatDTO = {
    msgText: '',
    reciverId: '',
    senderId: this.Auth.gettokenID(),
   
  }


  avatarUrls = [
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp",
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp",

  ];

  constructor(private chatService: ChatService, private Auth: AuthService) {
    this.senderName = this.chatService.GetSenderName(this.Auth.gettokenID());
    this.chatService.GetUserObj().subscribe((dt) => {
      this.AllUsers = dt;
      this.recieverName = dt[0].userName;
      console.log(this.AllUsers)
    })
  }

  AllUsers: User[] = [];
  chats: Ichat[] = [];
  sendID!: string;
  senderName!: any;
  recieverName!: any;
  recievID!: string;


  hubConnectionBuilderShare!: HubConnection;
  ngOnInit(): void {
    this.hubConnectionBuilderShare = new signalR.HubConnectionBuilder().withUrl('http://localhost:5294/ChatHub',
      {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilderShare.start().then(() => {
        console.log("connection started");
      }).catch(err => console.log(err));
    }, 2000);

    //   this.hubConnectionBuilderShare.on('ReceiveMessage', (message) => {
    //     this.chats.push(message);
    //   console.log(this.getUsersNames2(this.currentUser));
    // });
  }


  currentUser: any = this.Auth.gettokenID();
  RCVId?: string;
  async SendMessage() {

    this.user.reciverId = this.RCVId;
    this.hubConnectionBuilderShare.invoke('NewMassameAdded', this.user);
    this.hubConnectionBuilderShare.off('ReceiveOneNotify');
    this.hubConnectionBuilderShare.on('ReceiveOneNotify', (message) => {
      const p: HTMLElement = document.createElement('P')
      const chat = document.getElementById('Chat')

      if(message.senderId==this.currentUser)
      {

        p.innerHTML = `
 
        <li class="p-2 border-bottom" >
            <div class="pt-1">
              <div  class="d-flex flex-row justify-content-start" style="margin-top: 2%;">
                <p class="large p-2 me-3 mb-1 rounded-3 rightMsg" style="width: 50%;   margin-left: auto;" > ${ message.msgText }</p>
              </div>
          </div>
        </li>

      `

      }
      else
      {

        p.innerHTML = `
        <li class="p-2 border-bottom" >
            <div class="pt-1">
              <div  class="d-flex flex-row justify-content-start" style="margin-top: 2%; margin-left: auto;">
                <p style="width: 40%;" class="large p-2 me-3 mb-1 rounded-3 leftMsg" > ${ message.msgText }</p>
              </div>
          </div>
        </li>
      `
      }
    
      chat?.appendChild(p);
      console.log('Sending message to server: ' + ' says ' + message);
    });

    this.chatService.SendMessage(this.user).subscribe({
      next: () => {

        console.log(this.user.msgText);
        this.user.msgText = '';
      }
    });
  }

  async GetMesg(UserId?: string) {
    this.RCVId = UserId;
    this.chatService.GetConversation(UserId).subscribe((data) => {
      this.chats = data;
      console.log(this.chats)
    },
      (err) => {
        console.log(err);
      });

  }


  userName!: string;
  getUsersNames2(userId: string) {
    userId = this.Auth.gettokenID();
    this.chatService.GetSenderName(userId).subscribe((data) => {
      console.log(data.userName);
      this.senderName = data.userName;
    }

    )

  }


}


