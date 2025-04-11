class ContactForm {
	constructor(modalId = "contact_modal") {
		this.modal = document.getElementById(modalId);
		this.initModal();
	}

	initModal() {
		const contactButton = document.querySelector('.photographer-header-contact');
		if (contactButton) {
			contactButton.addEventListener('click', () => this.displayModal());
		}

		const closeContactButton = document.querySelector('.close-button');
		if (closeContactButton) {
			closeContactButton.addEventListener('click', () => this.closeModal());
		}

		const form = document.querySelector('.contact_form');
		if (form) {
			form.addEventListener('submit', (e) => this.handleSubmit(e, form));
		}
	}

	displayModal() {
		this.modal.style.display = "flex";
		this.modal.setAttribute("aria-hidden", "false");
	}

	closeModal() {
		this.modal.style.display = "none";
		this.modal.setAttribute("aria-hidden", "true");
	}

	handleSubmit(event, form) {
		event.preventDefault();

		const formData = {
			firstName: form.querySelector('[name="firstName"]').value,
			lastName: form.querySelector('[name="lastName"]').value,
			email: form.querySelector('[name="email"]').value,
			message: form.querySelector('[name="message"]').value,
		};

		console.log("Formulaire envoyé", formData);

		const modal = document.querySelector('.contact_form');
		modal.innerHTML = `<p>Merci pour votre message, ${formData.firstName} ${formData.lastName} !</p>`
	}
}