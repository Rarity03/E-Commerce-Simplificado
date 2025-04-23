# E-Commerce Simplificado 🛒

Un proyecto de E-commerce simplificado que permite a los usuarios explorar productos, agregar al carrito, realizar pedidos y gestionar su perfil. Este proyecto incluye un frontend desarrollado con React y un backend construido con Node.js y MongoDB.

---

## **Características**
- 🛍️ **Explorar productos**: Filtrar por categoría, precio y estado.
- 🛒 **Carrito de compras**: Agregar, eliminar y modificar productos.
- 📦 **Gestión de pedidos**: Ver historial de pedidos y detalles de cada orden.
- 🔒 **Autenticación**: Registro, inicio de sesión y protección de rutas.
- ⚙️ **Panel de usuario**: Actualizar perfil y dirección de envío.

---

## **Tecnologías utilizadas**
### **Frontend**
- React (React Router, React Hook Form)
- Tailwind CSS
- Axios

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) para autenticación
- Zod para validación de datos

---

## **Requisitos previos**
1. **Node.js**: [Descargar Node.js](https://nodejs.org/)
2. **Cluster en MongoDB Atlas**
3. **Git**: [Instalar Git](https://git-scm.com/)

---

## **Instalación**
### **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/ecommerce-simplificado.git
cd ecommerce-simplificado
```

---

## **Configuración del backend**

1. Ve al directorio del servidor
```bash
cd Server
```

2. Instala las dependencias
```bash
npm install
```

3. Crea un archivo .env en el directorio del servidor con las siguientes variables
```bash
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/ecommerce
CLIENT_URL=http://localhost:5173
JWT_SECRET=tu_secreto
```
4. Iniciar el servidor
```bash
npm run dev
```

---

## **Configuración del frontend**

1.Ve al directorio del cliente
```bash
cd Client
```

2.Instala las dependencias
```bash
npm install
```
3.Crea un archivo .env en el directorio Client con la siguiente variable
```bash
VITE_API_URL=http://localhost:3000/api
```

4.Inicia el cliente:
```bash
npm run dev
```

---

## **Uso**

1.Abre el navegador y ve a http://localhost:5173.

2.Regístrate o inicia sesión. Puedes logearte con la siguiente cuenta publica:
Email: PublicTest@email.com
Password: PublicTest

3.Explora los productos, agrégalos al carrito y realiza pedidos.

4.Gestiona tu perfil desde la sección de usuario.

---

## **Contacto**
-Autor: Kenneth Kael Mendoza Pliego 

-Email: kennethkael@gmail.com

-GitHub: https://github.com/Rarity03
