const Article = require("../models/Article.js");
const User = require("../models/User");



/**
 * @async
 * @function getAllArticles
 * @description Obtener todos los artículos con paginación y búsqueda
 */
exports.getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const skip = (page - 1) * limit;

    let filter = search ? { title: { $regex: search, $options: "i" } } : {};
    if (category) filter.category = category;

    const total = await Article.countDocuments(filter);
    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalArticles: total
    });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
};

/**
 * @async
 * @function getArticleById
 * @description Obtener un artículo específico por su ID
 */
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el artículo" });
  }
};

/**
 * @async
 * @function createArticle
 * @description Crear un nuevo artículo (Solo administradores)
 */
exports.createArticle = async (req, res) => {
  try {
    const { title, content, url, category } = req.body;
    const newArticle = new Article({ title, content, url: url || null, category: category || "General" });
    await newArticle.save();
    res.json({ message: "Artículo creado correctamente", article: newArticle });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el artículo" });
  }
};

/**
 * @async
 * @function updateArticle
 * @description Actualizar un artículo existente
 */
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json({ message: "Artículo actualizado correctamente", article });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el artículo" });
  }
};

/**
 * @async
 * @function deleteArticle
 * @description Eliminar un artículo del sistema
 */
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json({ message: "Artículo eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el artículo" });
  }
};

/**
 * @async
 * @function addComment
 * @description Agregar un comentario a un artículo
 */
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });

    // El username viene del token decodificado por el middleware
    let commentUsername = req.user?.username;

    // Fallback: Si el token es antiguo y no tiene el username, lo buscamos en la DB
    if (!commentUsername) {
      const userDoc = await User.findByPk(req.user.id);
      commentUsername = userDoc?.username || "Usuario";
    }

    article.comments = article.comments || [];
    article.comments.push({
      text,
      username: commentUsername,
      date: new Date()
    });

    await article.save();
    res.json({ message: "Comentario agregado correctamente", comments: article.comments });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar el comentario" });
  }
};