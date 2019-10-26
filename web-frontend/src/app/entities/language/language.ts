export class Language {
  label: string;
  value: string;

  constructor(
    public key?: string,
    public alt?: string,
    public title?: string,
  ) {
    this.value = this.key;
    this.label = this.title;
  }

  toString() {
    return this.key + ',' + this.title;
  }


}

