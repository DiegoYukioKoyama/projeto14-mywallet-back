import dayjs from "dayjs";

export class Entry {
  constructor(email, description, value, type) {
    this.email = email;
    this.description = description;
    this.value = value;
    this.type = type;
    this.date = dayjs().format("DD/MM");
  }
}