import Controller from "./controller";
import stories from "../data/message.json";

class IndexController extends Controller {
  ready() {
    let messages = stories.messages;
    let messageID = Math.round(Math.random() * (messages.length - 1));
    let message = messages[messageID].message;
    let $ = this.jquery();

    $("#message").text(message);
    this.phoneHome("message", messageID);
  }

  onpage() {
    return "index";
  }
}

var controller = new IndexController();
