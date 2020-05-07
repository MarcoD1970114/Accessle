import * as config from "../data/config.json";
import $ from "jquery";

class Database {
  constructor() {
    this.configuration = config;
  }
  whereIsTheDatabase() {
    return this.configuration.url_host;
  }

  async sendToDatabase(hashID, where, what, value) {
    let when = new Date().getTime();
    let cargo = {
      hash: hashID,
      where: where,
      when: when,
      what: what,
      value: value
    };

    $.ajax({
      url: this.whereIsTheDatabase(),
      type: "POST",
      data: cargo,
      success: result => {
        console.log(result);
      }
    });
  }
}

export default Database;
