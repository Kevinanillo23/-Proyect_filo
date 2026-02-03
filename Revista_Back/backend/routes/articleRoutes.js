const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authenticateAdmin = require("../Middleware/authenticateAdmin");
const authenticateUser = require("../Middleware/authenticateUser");

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestión de artículos y comentarios
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Obtener todos los artículos
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Lista de artículos obtenida con éxito
 *   post:
 *     summary: Crear nuevo artículo
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               url:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artículo creado correctamente
 */
router.get("/", articleController.getAllArticles);
router.post("/", authenticateAdmin, articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Obtener artículo por ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artículo encontrado
 *   patch:
 *     summary: Actualizar artículo
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artículo actualizado correctamente
 *   delete:
 *     summary: Eliminar artículo
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artículo eliminado correctamente
 */
router.get("/:id", articleController.getArticleById);
router.patch("/:id", authenticateAdmin, articleController.updateArticle);
router.delete("/:id", authenticateAdmin, articleController.deleteArticle);

/**
 * @swagger
 * /articles/{id}/comments:
 *   post:
 *     summary: Agregar comentario
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario agregado correctamente
 */
router.post("/:id/comments", authenticateUser, articleController.addComment);

module.exports = router;