displayModal = () => {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

submitForm = (event, form) => {
	event.preventDefault();
	const formData = {
		firstName: form.firstName.value,
		lastName: form.lastName.value,
		email: form.email.value,
		message: form.message.value,
	};
	console.log(formData);
}
