let CheckboxItem = require("./google-form-checkbox-item")
let ListItem = require("./google-form-list-item")
let MultipleChoiceItem = require("./google-form-multiple-choice-item")
let TextItem = require("./google-form-text-item")

class GoogleFormBuilder {
  constructor(formName, title, description) {
    this.formName = formName;
    this.title = title || "";
    this.description = description || "";
    this.linked = false;
    this.items = [];
  }

  linkWithSheets() {
    this.linked = true;
  }

  toString() {
    let content = `var form = FormApp.create('${this.formName}');`;
    if (this.title.length){
      content += `form.setTitle("${this.title}");`
    }
    if (this.description.length){
      content += `form.setDescription("${this.description}");`
    }
    for (let i = 0; i < this.items.length; i++) {
      content += this.items[i].toString()
    }
    if(this.linked) {
      content += `var sheet = SpreadsheetApp.create("Responses", 50, 5);form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());Logger.log('Published URL: ' + form.getPublishedUrl());Logger.log('Editor URL: ' + form.getEditUrl());   var res = {'formResLink' : form.getPublishedUrl(), 'formEditLink' : form .getEditUrl(), 'sheetId' : sheet.getId() };return res;`
    }
    return content.replace(/;/g, ';\n')
  }

  toFunctionString() {
    return `function myFunction() {\n${this.toString()}}`
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  addMultipleChoiceItem() {
    let item = new MultipleChoiceItem();
    this.items.push(item)
    return item
  }

  addCheckboxItem() {
    let item = new CheckboxItem();
    this.items.push(item)
    return item
  }

  addTextItem() {
    let item = new TextItem();
    this.items.push(item)
    return item
  }

  addListItem() {
    let item = new ListItem();
    this.items.push(item)
    return item
  }
}

module.exports = GoogleFormBuilder;