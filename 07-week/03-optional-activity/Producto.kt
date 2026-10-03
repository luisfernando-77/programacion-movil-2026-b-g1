class Producto(
    val nombre: String?,
    val precio: Double
) {
    init {
        require(precio >= 0) { "El precio no puede ser negativo" }
    }

    fun mostrar() {
        println("Producto: ${nombre ?: "Sin nombre"} - Precio: $precio")
    }
}

fun main() {
    val producto1 = Producto("Cuaderno", 12000.0)
    val producto2 = Producto(null, 5000.0)

    producto1.mostrar()
    producto2.mostrar()
}