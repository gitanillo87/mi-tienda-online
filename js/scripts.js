// Variables de filtros
const campoBusqueda = document.getElementById("busqueda");
const selectCategoria = document.getElementById("categoria");
const precioMin = document.getElementById("precio-min");
const precioMax = document.getElementById("precio-max");
const botonFiltros = document.getElementById("aplicar-filtros");
const productos = document.querySelectorAll(".producto");

// Filtrar productos
function filtrarProductos() {
    const texto = campoBusqueda.value.toLowerCase();
    const categoria = selectCategoria.value;
    const minPrecio = parseFloat(precioMin.value) || 0;
    const maxPrecio = parseFloat(precioMax.value) || Infinity;

    productos.forEach((producto) => {
        const nombre = producto.querySelector(".nombre").textContent.toLowerCase();
        const categoriaProducto = producto.getAttribute("data-categoria");
        const precioProducto = parseFloat(producto.getAttribute("data-precio"));

        const coincideNombre = nombre.includes(texto);
        const coincideCategoria = !categoria || categoria === categoriaProducto;
        const coincidePrecio = precioProducto >= minPrecio && precioProducto <= maxPrecio;

        if (coincideNombre && coincideCategoria && coincidePrecio) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}

botonFiltros.addEventListener("click", filtrarProductos);
campoBusqueda.addEventListener("input", filtrarProductos);
selectCategoria.addEventListener("change", filtrarProductos);
precioMin.addEventListener("input", filtrarProductos);
precioMax.addEventListener("input", filtrarProductos);

// PayPal integración
paypal.Buttons({
    createOrder: function () {
        return fetch('/api/create-order', { method: 'POST' }).then((res) => res.json());
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then((details) => {
            alert("Transacción completada por " + details.payer.name.given_name);
        });
    },
}).render('#paypal-button-container');
