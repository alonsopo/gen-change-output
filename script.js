let placeholder = "%changeoutput_<options>_input:<input>_matcher:<matcher>_ifmatch:<output-if-matched>_else:<output-if-not-matched>%"

function createPlaceholder(){
    const generateBtn = document.getElementById("generate");
    const originalValue = generateBtn.value;
    generateBtn.classList.add('generating');
    generateBtn.value = '';
    
    setTimeout(() => {
        let element = document.getElementById("condition");
        var value = element.options[element.selectedIndex].value;

        let finalPlaceholder = placeholder.replace("<options>", value)
                                    .replace("<options>", value)
                                    .replace("<input>", inputText("input1"))
                                    .replace("<matcher>", inputText("input2"))
                                    .replace("<output-if-matched>", inputText("ontrue"))
                                    .replace("<output-if-not-matched>", inputText("onfalse"))
        
        let generatedTextboxElement = document.getElementById("generated-placeholder");
        generatedTextboxElement.value = finalPlaceholder;
        
        generateBtn.classList.remove('generating');
        generateBtn.value = originalValue;
        
        generatedTextboxElement.classList.add('success-glow');
        setTimeout(() => {
            generatedTextboxElement.classList.remove('success-glow');
        }, 1500);
    }, 400);
}

function inputText(id){
    return document.getElementById(id).value
}

document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyBtn');
    const textarea = document.getElementById('generated-placeholder');
    
    copyBtn.addEventListener('click', function() {
        textarea.select();
        document.execCommand('copy');
        
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});