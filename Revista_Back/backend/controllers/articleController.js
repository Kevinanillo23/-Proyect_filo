const Article = require("../models/Article.js");

/**
 * Obtener todos los artículos
 * @async
 * @function getAllArticles
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
exports.getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // Filtro de búsqueda (si existe 'search')
    const filter = search
      ? { title: { $regex: search, $options: "i" } } // Búsqueda insensible a mayúsculas
      : {};

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
    console.error(err);
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
};

/**
 * Obtener un artículo por ID
 * @async
 * @function getArticleById
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el artículo" });
  }
};

/**
 * Crear un nuevo artículo (solo admin)
 * @async
 * @function createArticle
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
exports.createArticle = async (req, res) => {
  try {
    const { title, content, url } = req.body;
    const newArticle = new Article({ title, content, url: url || null });
    await newArticle.save();
    res.json({ message: "Artículo creado correctamente", article: newArticle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el artículo" });
  }
};

/**
 * Actualizar un artículo (solo admin)
 * @async
 * @function updateArticle
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
exports.updateArticle = async (req, res) => {
  try {
    const { title, content, url } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, url: url || null },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json({ message: "Artículo actualizado correctamente", article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el artículo" });
  }
};

/**
 * Eliminar un artículo (solo admin)
 * @async
 * @function deleteArticle
 * @param {object} req - Objeto de petición Express
 * @param {object} res - Objeto de respuesta Express
 * @returns {Promise<void>}
 */
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json({ message: "Artículo eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el artículo" });
  }
};
