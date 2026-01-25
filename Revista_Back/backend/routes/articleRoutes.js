const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authenticateAdmin = require("../Middleware/authenticateAdmin");
const authenticateUser = require("../Middleware/authenticateUser");

/**
 * @swagger
 * tags:
 * - name: Articles
 * description: Gestion de articulos
 */

/**
 * @swagger
 * /articles:
 * get:
 * summary: Obtener todos los articulos
 * tags: [Articles]
 * responses:
 * 200:
 * description: Exito
 * post:
 * summary: Crear nuevo articulo
 * tags: [Articles]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * responses:
 * 201:
 * description: Creado
 */
router.get("/", articleController.getAllArticles);
router.post("/", authenticateAdmin, articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 * get:
 * summary: Obtener articulo por ID
 * tags: [Articles]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Encontrado
 * patch:
 * summary: Actualizar articulo
 * tags: [Articles]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * responses:
 * 200:
 * description: Actualizado
 * delete:
 * summary: Eliminar articulo
 * tags: [Articles]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Eliminado
 */
router.get("/:id", articleController.getArticleById);
router.patch("/:id", authenticateAdmin, articleController.updateArticle);
router.delete("/:id", authenticateAdmin, articleController.deleteArticle);

/**
 * @swagger
 * /articles/{id}/comments:
 * post:
 * summary: Agregar comentario
 * tags: [Articles]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * text:
 * type: string
 * responses:
 * 200:
 * description: Comentario ok
 */
router.post("/:id/comments", authenticateUser, articleController.addComment);

module.exports = router;