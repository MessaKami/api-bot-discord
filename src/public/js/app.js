document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');

  // Formulaire d'ajout d'utilisateur
  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addUserForm);
    const userData = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName')
    };

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Erreur lors de la création de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de l\'utilisateur');
    }
  });

  // Boutons de suppression
  document.querySelectorAll('.delete-user').forEach(button => {
    button.addEventListener('click', async () => {
      if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        const userId = button.dataset.id;
        try {
          const response = await fetch(`/users/${userId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            window.location.reload();
          } else {
            alert('Erreur lors de la suppression de l\'utilisateur');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur lors de la suppression de l\'utilisateur');
        }
      }
    });
  });
}); 