var Form = require("./google-form-builder")
console.log(Form)
let form = new Form("New Form");
form.setTitle("Abacus Form Test");
form.setDescription("This is a form test");
form.addListItem().setTitle("This is a List Item").setChoices(["A","B","C"]);
form.addCheckboxItem().setTitle("This is a Checkbox Item").setChoices(["A","B","C"]).showOtherOption();
form.addMultipleChoiceItem().setTitle("This is a Multiple Choice Item").setChoices(["A","B","C"]);
form.addTextItem().setTitle("This is a Text Item").setRequired();
console.log(form.linkWithSheets())
// form.linkWithSheets();
console.log(form.toFunctionString());
