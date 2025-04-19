document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('player-form');
  
  if (form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = {
        realName: document.getElementById('realName').value,
        gameName: document.getElementById('gameName').value,
        age: document.getElementById('age').value,
        country: document.getElementById('country').value,
        playingTime: document.getElementById('playingTime').value,
        activeTime: document.getElementById('activeTime').value,
        activePerson: document.getElementById('activePerson').value,
      };

      try {
        const response = await fetch('/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Formulario enviado correctamente');
          form.reset(); // 👈 Esto limpia el formulario después de enviarlo
        } else {
          alert('Hubo un error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    });
  }
});











// Función de login para admin.html
async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('https://formularioteamsamuraidrifters.onrender.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    console.log(`Administrador ${username} ingresó al panel.`);
    loadSubmissions();
  } else {
    document.getElementById('login-msg').innerText = data.message;
  }
}





function togglePassword() {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
}





async function loadSubmissions() {
  const res = await fetch('/api/admin/submissions'); // Asegúrate de que esta ruta sea la correcta
  const submissions = await res.json();

  // Obtiene la tabla donde se mostrarán los datos
  const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];

  // Limpiar la tabla antes de agregar los nuevos datos
  table.innerHTML = '';  // Esto eliminará todas las filas actuales, para mostrar solo las nuevas

  // Iterar sobre las respuestas y agregar una fila por cada respuesta
  submissions.forEach(sub => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sub.realName || 'No disponible'}</td>
      <td>${sub.gameName || 'No disponible'}</td>
      <td>${sub.age || 'No disponible'}</td>
      <td>${sub.country || 'No disponible'}</td>
      <td>${sub.playingTime || 'No disponible'}</td>
      <td>${sub.activeTime || 'No disponible'}</td>
      <td>${sub.activePerson || 'No disponible'}</td>
    `;
    // Usamos insertBefore() para agregar la fila en la parte inferior
    table.appendChild(row); // Esto asegura que las filas nuevas se agreguen siempre al final
  });
}



