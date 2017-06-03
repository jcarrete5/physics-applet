/*
 * Synchronize sliders and input text fields for each sync-option.
 * Also bounds the input text fields if any exist.
 */
window.onload = function() {
	var options = document.getElementsByClassName('sync-option');
	for (let i = 0; i < options.length; i++) {
		let inputs = options[i].getElementsByTagName('input');

		for (let j = 0; j < inputs.length; j++) {
			let curInput = inputs[j];
			if (curInput.type === 'range') {
				curInput.oninput = function() {
					for (let k = 0; k < inputs.length; k++) {
						inputs[k].value = curInput.value;
					}
				};
			} else if (curInput.type === 'number') {
				curInput.onchange = function() {
					if (curInput.value === '') {
						curInput.value = curInput.min;
					} else {
						let val = parseFloat(curInput.value);
						if (val > curInput.max) curInput.value = curInput.max;
						if (val < curInput.min) curInput.value = curInput.min;
					}
					
					for (let k = 0; k < inputs.length; k++) {
						inputs[k].value = curInput.value;
					}
				};
			}
		}
	}
}
