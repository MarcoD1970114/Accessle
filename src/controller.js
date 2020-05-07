import $ from "jquery";
import Popper from "popper.js";
import "bootstrap";
import Fingerprintjs2 from "fingerprintjs2";
import Database from "./database";

window.$ = $;
window.jQuery = $;
window.Popper = Popper;

class Controller {
  constructor() {
    this.$ = window.$;
    this.now = new Date().getTime();
    //null really means not set yet.
    this.hashID = null;
    this.database = new Database();

    this.doHashing();

    $(document).ready(() => {
      $("#year").text(new Date().getFullYear());
      $("[name]").mouseover(event => {
        this.phoneHome("item", $(event.currentTarget).attr("name"));
      });

      $(window).on("scroll", () => {
        this.phoneHome("location", $(window).scrollTop() / $(window).height());
      });

      $(window).on("beforeunload", () => {
        this.phoneHome("end", { start: this.now, end: new Date().getTime() });
      });

      this.ready();
    });
  }

  onpage() {}

  ready() {}

  jquery() {
    return this.$;
  }

  async doHashing() {
    Fingerprintjs2.getV18(machineID => {
      this.hashID = machineID;
    });
  }

  async phoneHome(what, value) {
    if (this.isHashSet()) {
      //only phone home when we have an ID
      this.database.sendToDatabase(this.hashID, this.onpage(), what, value);
    }
  }

  isHashSet() {
    return this.hashID != null;
  }
}

export default Controller;
