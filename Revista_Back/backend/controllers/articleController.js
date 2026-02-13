const Article = require("../models/Article.js");
const User = require("../models/User");

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
    console.error("Fetch articles error:", err.message);
    res.status(500).json({ error: "No se pudieron recuperar los artículos" });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Error al cargar el artículo" });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { title, content, url, category } = req.body;
    const newArticle = new Article({
      title,
      content,
      url: url || null,
      category: category || "General"
    });
    await newArticle.save();
    res.status(201).json({ message: "Artículo creado con éxito", article: newArticle });
  } catch (err) {
    console.error("Create article error:", err.message);
    res.status(500).json({ error: "Error de servidor al crear el artículo" });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ error: "Artículo no existente" });
    res.json({ message: "Actualización realizada con éxito", article });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
    res.json({ message: "Artículo eliminado satisfactoriamente" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar el artículo" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Artículo no encontrado" });

    let username = req.user?.username;

    // Resolve username if missing in payload
    if (!username) {
      const userDoc = await User.findByPk(req.user.id);
      username = userDoc?.username || "Usuario";
    }

    article.comments = article.comments || [];
    article.comments.push({
      text,
      username,
      date: new Date()
    });

    await article.save();
    res.json({ message: "Comentario publicado", comments: article.comments });
  } catch (err) {
    console.error("Comment error:", err.message);
    res.status(500).json({ error: "Error al publicar el comentario" });
  }
};