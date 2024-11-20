// Ruta al archivo JSON
const jsonPath = "./assets/js/data/funcionarios.json";

// Seleccionar el contenedor del <section>
const sectionContainer = document.querySelector("section");

// Función para crear y renderizar las cards
const renderCards = async () => {
  try {
    // Leer los datos del JSON
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }
    const funcionarios = await response.json();

    // Generar las cards
    const cardsHTML = funcionarios
      .map((funcionario) => {
        return `
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4">
            <!-- Imagen -->
            <img src="${funcionario.imagen}" alt="${funcionario.nombre}" class="w-full h-48 object-cover rounded-t-lg mb-4">

            <!-- Nombre -->
            <h2 class="text-xl font-bold text-gray-800 mb-2">${funcionario.nombre}</h2>

            <!-- Correo -->
            <p class="text-gray-600 text-sm mb-1">
              <i class="fa fa-envelope text-primaryColor"></i> 
              ${funcionario.correo}
            </p>

            <!-- Teléfono -->
            <p class="text-gray-600 text-sm mb-1">
              <i class="fa fa-phone text-primaryColor"></i> 
              ${funcionario.telefono}
            </p>

            <!-- Profesión -->
            <p class="text-gray-600 text-sm mb-4">
              <i class="fa fa-briefcase text-primaryColor"></i> 
              ${funcionario.profesion}
            </p>

            <!-- Botón Hoja de Vida -->
            <a href="${funcionario.cv_link}" target="_blank"
              class="inline-block bg-primaryColor text-white px-4 py-2 rounded-lg hover:bg-secondaryColor">
              Ver Hoja de Vida
            </a>
          </div>
        `;
      })
      .join(""); // Unir todas las cards en un solo string

    // Insertar las cards en el <section>
    sectionContainer.innerHTML = cardsHTML;
  } catch (error) {
    console.error("Error cargando los datos:", error);
    sectionContainer.innerHTML =
      '<p class="text-red-500">Error al cargar los datos.</p>';
  }
};

// Llamar a la función de renderizado
renderCards();