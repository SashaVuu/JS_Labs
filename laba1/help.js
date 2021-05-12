//Отображение нужного selected item
const select = document.getElementsByTagName('select')[0];
const options=select.getElementsByTagName('option');
const status =select.attributes.placeholder.value;
console.log(select.attributes.placeholder.value);

for (let i = 0; i < select.length; i++) {
    if (options[i].value === status) options[i].selected = true
}