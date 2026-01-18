const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authenticateAdmin = require("../Middleware/authenticateAdmin");

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Endpoints para gestión de artículos
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Obtener todos los artículos
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Lista de artículos
 */
router.get("/", articleController.getAllArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Obtener un artículo por ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo encontrado
 *       404:
 *         description: Artículo no encontrado
 */
router.get("/:id", articleController.getArticleById);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Crear un nuevo artículo
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artículo creado
 *       401:
 *         description: No autorizado
 */
router.post("/", authenticateAdmin, articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: Actualizar un artículo por ID
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo
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
 *         description: Artículo actualizado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Artículo no encontrado
 */
router.patch("/:id", authenticateAdmin, articleController.updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Eliminar un artículo por ID
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Artículo no encontrado
 */
router.delete("/:id", authenticateAdmin, articleController.deleteArticle);

module.exports = router;