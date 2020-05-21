const elForm = document.forms['loginForm'];

elForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const { data } = await axios.post('/auth/login', formData);

})