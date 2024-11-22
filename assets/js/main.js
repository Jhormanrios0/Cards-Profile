// Ruta al archivo JSON
const jsonPath = "./assets/js/data/funcionarios.json";

// Seleccionar el contenedor del <section>
const sectionContainer = document.querySelector("section");

// Función para crear y renderizar las cards
const renderCards = async () => {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const cardsHTML = data
      .map((funcionario) => {
        return `
          <!--TODO CARD FUNCIONARIO -->
          <article class="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden transition-all duration-300 hover:shadow-indigo-500/50">
            <!--*CONTENEDOR CIRCULAR DE IMAGEN -->
            <figure class="relative h-[150px] bg-gradient-to-r from-indigo-600 to-blue-500">
              <img src="${funcionario.imagen}" alt="${funcionario.nombre}"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-[200px] h-[200px] rounded-full border-4 border-white">
            </figure>
            <!--*CONTENEDOR DE INFORMACIÓN -->
            <section class="pt-20 pb-6 text-center">
              <!--*Contenedor de título y descripción -->
              <article class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">${funcionario.nombre}</h2>
                <span class="block text-indigo-600 font-semibold mb-1">${funcionario.profesion}</span>
                <p class="text-gray-600">${funcionario.descripcion}</p>
              </article>
          
              <!--*Correo electrónico y teléfono -->
              <section class="w-full flex flex-col items-center mb-6 gap-[15px] border-y-[2px] border-indigo-500/70">
                <div class="flex items-center space-x-3">
                  <i class="fi fi-rs-envelope text-indigo-600 text-lg" aria-hidden="true"></i>
                  <a href="mailto:${funcionario.correo}" aria-label="Correo electrónico: ${funcionario.correo}"
                    class="text-gray-800 hover:text-indigo-800 transition-colors duration-300">${funcionario.correo}</a>
                </div>
                <div class="flex items-center space-x-3">
                  <i class="fi fi-rr-phone-rotary text-indigo-600 text-lg" aria-hidden="true"></i>
                  <a href="tel:${funcionario.telefono}" aria-label="Teléfono: ${funcionario.telefono}"
                    class="text-gray-800 hover:text-indigo-800 transition-colors duration-300">${funcionario.telefono}</a>
                </div>
              </section>
          
              <!--*País, Departamento y Ciudad -->
              <ul class="text-left grid grid-cols-2 gap-4">
                <li class="col-span-1 flex justify-center items-center gap-[10px]">
                  <i class="fi fi-rs-globe text-indigo-600 text-lg" aria-hidden="true"></i>
                  <span class="text-gray-800">${funcionario.pais}</span>
                </li>
                <li class="col-span-1 flex justify-center items-center gap-[10px]">
                  <i class="fi fi-rr-map-marker text-indigo-600 text-lg" aria-hidden="true"></i>
                  <span class="text-gray-800">${funcionario.departamento}</span>
                </li>
                <li class="col-span-2 flex justify-center items-center gap-[10px]">
                  <i class="fi fi-rr-city text-indigo-600 text-lg" aria-hidden="true"></i>
                  <span class="text-gray-800">${funcionario.ciudad}</span>
                </li>
              </ul>
            </section>
        
            <!--*BOTÓN DE PDF-->
            <section class="bg-indigo-100/50 px-6 pb-[10px]">
              <a href="${funcionario.cv_link}" target="_blank"
                class="w-full bg-indigo-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2">
                Ver Hoja de Vida
              </a>
            </section>
          </article>
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