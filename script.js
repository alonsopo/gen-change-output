let placeholder = "%changeoutput_<options>_input:<input>_matcher:<matcher>_ifmatch:<output-if-matched>_else:<output-if-not-matched>%";

function createPlaceholder(){
    const generateBtn = document.getElementById("generate");
    const generatedTextboxElement = document.getElementById("generated-placeholder");

    generateBtn.classList.add('loading');

    setTimeout(() => {
        let element = document.getElementById("condition");
        var value = element.options[element.selectedIndex].value;

        let finalPlaceholder = placeholder.replace("<options>", value)
                                    .replace("<options>", value)
                                    .replace("<input>", inputText("input1"))
                                    .replace("<matcher>", inputText("input2"))
                                    .replace("<output-if-matched>", inputText("ontrue"))
                                    .replace("<output-if-not-matched>", inputText("onfalse"));
        
        generatedTextboxElement.value = finalPlaceholder;

        generatedTextboxElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            generatedTextboxElement.style.transform = 'scale(1)';
        }, 200);

        generateBtn.classList.remove('loading');

        generatedTextboxElement.focus();
        
    }, 300);
}

function inputText(id){
    return document.getElementById(id).value;
}

function copyToClipboard() {
    const textarea = document.getElementById("generated-placeholder");
    const copyBtn = document.getElementById("copy-btn");
    const toast = document.getElementById("toast");
    const copyText = copyBtn.querySelector('.copy-text');
    const copyIcon = copyBtn.querySelector('.copy-icon');
    
    if (textarea.value.trim() === '') {
        showToast('Nothing to copy! Generate a placeholder first.', 'warning');
        return;
    }

    textarea.select();
    textarea.setSelectionRange(0, 99999);
    
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                showCopySuccess(copyBtn, copyText, copyIcon);
            }).catch(() => {
                fallbackCopy(textarea, copyBtn, copyText, copyIcon);
            });
        } else {
            fallbackCopy(textarea, copyBtn, copyText, copyIcon);
        }
    } catch (err) {
        showToast('Failed to copy to clipboard', 'error');
        console.error('Copy failed:', err);
    }
}

function fallbackCopy(textarea, copyBtn, copyText, copyIcon) {
    try {
        document.execCommand('copy');
        showCopySuccess(copyBtn, copyText, copyIcon);
    } catch (err) {
        showToast('Failed to copy to clipboard', 'error');
        console.error('Fallback copy failed:', err);
    }
}

function showCopySuccess(copyBtn, copyText, copyIcon) {
    copyText.textContent = 'Copied!';
    copyIcon.setAttribute('data-feather', 'check');
    feather.replace();
    copyBtn.style.background = 'var(--success-500)';
    copyBtn.style.borderColor = 'var(--success-500)';
    copyBtn.style.color = 'white';
    
    showToast('Copied to clipboard!', 'success');

    setTimeout(() => {
        copyText.textContent = 'Copy';
        copyIcon.setAttribute('data-feather', 'copy');
        feather.replace();
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
    }, 2000);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById("toast");
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    
    switch(type) {
        case 'success':
            toastIcon.setAttribute('data-feather', 'check-circle');
            toast.style.background = 'var(--success-500)';
            break;
        case 'warning':
            toastIcon.setAttribute('data-feather', 'alert-circle');
            toast.style.background = 'var(--warning-500)';
            break;
        case 'error':
            toastIcon.setAttribute('data-feather', 'x-circle');
            toast.style.background = 'var(--error-500)';
            break;
    }
    
    feather.replace();
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            createPlaceholder();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement.id === 'generated-placeholder') {
            e.preventDefault();
            copyToClipboard();
        }
    });
    
    const generateBtn = document.getElementById('generate');
    generateBtn.addEventListener('click', function() {
        validateForm();
    });
});

function validateForm() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const ontrue = document.getElementById('ontrue');
    const onfalse = document.getElementById('onfalse');
    
    let isValid = true;
    const requiredFields = [input1, input2, ontrue, onfalse];
    
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            field.style.borderColor = 'var(--error-500)';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            isValid = false;
            
            setTimeout(() => {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }, 3000);
        }
    });
    
    if (!isValid) {
        showToast('Please fill in all required fields', 'warning');
        return false;
    }
    
    return true;
}

function autoResize() {
    const textarea = document.getElementById('generated-placeholder');
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(120, textarea.scrollHeight) + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('generated-placeholder');
    textarea.addEventListener('input', autoResize);
    
    autoResize();
});

function scrollToOutput() {
    const outputSection = document.querySelector('.output-section');
    outputSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
    });
}

const originalCreatePlaceholder = createPlaceholder;
createPlaceholder = function() {
    if (!validateForm()) return;
    
    originalCreatePlaceholder();

    setTimeout(() => {
        scrollToOutput();
    }, 350);
};
