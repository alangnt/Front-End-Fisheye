customSelectInit = () => {
	const select = document.querySelector(".custom-select");
	const trigger = select.querySelector(".custom-select-trigger-ctn");
	const optionsContainer = select.querySelector(".custom-select-options-ctn");
	const options = select.querySelectorAll(".custom-select-option");
	const chevron = select.querySelector(".fa-chevron-up");
	
	trigger.addEventListener("click", () => {
		if (trigger.classList.contains("custom-select-open")) {
			trigger.classList.remove("custom-select-open");
			optionsContainer.classList.remove("custom-select-options-open");
			chevron.classList.remove("custom-select-trigger-spin");
		}
		else {
			trigger.classList.add("custom-select-open");
			optionsContainer.classList.add("custom-select-options-open");
			chevron.classList.add("custom-select-trigger-spin");
		}
	});
	
	options.forEach(option => {
		option.addEventListener("click", () => {
			trigger.textContent = option.textContent;
			select.classList.remove("open");
		});
	});
}

document.addEventListener("DOMContentLoaded", (e) => {customSelectInit()})
