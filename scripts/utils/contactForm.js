class ContactForm {
	constructor(modalId = "contact_modal") {
		this.modal = document.getElementById(modalId);
		this.focusableElementsString = 'input, textarea, button, [tabindex]:not([tabindex="-1"])';
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.initModal();
	}
	
	initModal() {
		const contactButton = document.querySelector('.photographer-header-contact');
		if (contactButton) {
			contactButton.addEventListener('click', () => this.displayModal());
			contactButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					this.displayModal();
				}
			});
		}
		
		this.closeContactButton = document.querySelector('.close-button');
		if (this.closeContactButton) {
			this.closeContactButton.setAttribute('tabindex', '0');
			this.closeContactButton.addEventListener('click', () => this.closeModal());
			this.closeContactButton.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					this.closeModal();
				}
			})
		}
		
		const form = document.querySelector('.contact_form');
		if (form) {
			form.addEventListener('submit', (e) => this.handleSubmit(e, form));
		}
		
		document.addEventListener('keydown', (e) => {
			if (this.modal.style.display !== "flex") return;
			
			if (e.key === 'Escape') {
				this.closeModal();
			}
			
			if (e.key === 'Tab') {
				const focusables = this.modal.querySelectorAll(this.focusableElementsString);
				if (focusables.length === 0) return;
				
				this.firstFocusable = focusables[0];
				this.lastFocusable = focusables[focusables.length - 1];
				
				if (e.shiftKey) {
					if (document.activeElement === this.firstFocusable) {
						e.preventDefault();
						this.lastFocusable.focus();
					}
				} else {
					if (document.activeElement === this.lastFocusable) {
						e.preventDefault();
						this.firstFocusable.focus();
					}
				}
			}
		});
	}
	
	displayModal() {
		this.modal.style.display = "flex";
		this.modal.setAttribute("aria-hidden", "false");
		
		const firstInput = this.modal.querySelector('input, textarea, button');
		if (firstInput) {
			setTimeout(() => firstInput.focus(), 50);
		}
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
		
		form.innerHTML = `<p>Merci pour votre message, ${formData.firstName} ${formData.lastName} !</p>`;
		
		if (this.closeContactButton) {
			this.closeContactButton.focus();
		}
	}
}
