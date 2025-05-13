const Product = require("../models/product");

const getTypes = async () => {
  const totalVinos = await Product.countDocuments({
    tags: { $in: ["tinto", "blanco", "rosado"] },
  });
  const totalEspumosos = await Product.countDocuments({ tags: "espumosos" });
  const totalDestilados = await Product.countDocuments({ tags: "destilados" });

  return {
    totalVinos,
    totalEspumosos,
    totalDestilados,
  };
};

const getVinosTypes = async () => {
  const totalTintos = await Product.countDocuments({ subType: "vinos-tintos" });
  const totalBlancos = await Product.countDocuments({
    subType: "vinos-blancos",
  });
  const totalRosados = await Product.countDocuments({
    subType: "vinos-rosados",
  });
  const totalGenerosos = await Product.countDocuments({
    subType: "vinos-generosos",
  });
  const totalDulces = await Product.countDocuments({ subType: "vinos-dulces" });
  const totalNaranjas = await Product.countDocuments({
    subType: "vinos-naranjas",
  });
  const totalVermuts = await Product.countDocuments({
    subType: "vermuts",
  });

  return {
    totalTintos,
    totalBlancos,
    totalRosados,
    totalGenerosos,
    totalDulces,
    totalNaranjas,
    totalVermuts,
  };
};

const getEspumososTypes = async () => {
  const totalChampagnes = await Product.countDocuments({
    subType: "champagnes",
  });
  const totalCavas = await Product.countDocuments({ subType: "cavas" });
  const totalCorpinnats = await Product.countDocuments({
    subType: "corpinnats",
  });
  const totalProseccos = await Product.countDocuments({ subType: "proseccos" });
  const totalOtrosEspumosos = await Product.countDocuments({
    subType: "otros-espumosos",
  });

  return {
    totalChampagnes,
    totalCavas,
    totalCorpinnats,
    totalProseccos,
    totalOtrosEspumosos,
  };
};

const getDestiladosTypes = async () => {
  const totalRones = await Product.countDocuments({ subType: "rones" });
  const totalGinebras = await Product.countDocuments({ subType: "ginebras" });
  const totalWhiskys = await Product.countDocuments({ subType: "whiskys" });
  const totalVodkas = await Product.countDocuments({ subType: "vodkas" });
  const totalCognacs = await Product.countDocuments({ subType: "cognacs" });
  const totalBrandys = await Product.countDocuments({ subType: "brandys" });
  const totalPastis = await Product.countDocuments({ subType: "pastis" });
  const totalTequilasYMezcales = await Product.countDocuments({
    subType: "tequilas-y-mezcales",
  });
  const totalGrappasYAguardientes = await Product.countDocuments({
    subType: "grappas-y-aguardientes",
  });
  const totalCalvados = await Product.countDocuments({ subType: "calvados" });
  const totalLicores = await Product.countDocuments({ subType: "licores" });
  const totalPacharanes = await Product.countDocuments({
    subType: "pacharanes",
  });
  const totalAperitivos = await Product.countDocuments({
    subType: "aperitivos",
  });

  return {
    totalRones,
    totalGinebras,
    totalWhiskys,
    totalVodkas,
    totalCognacs,
    totalBrandys,
    totalPastis,
    totalTequilasYMezcales,
    totalGrappasYAguardientes,
    totalCalvados,
    totalLicores,
    totalPacharanes,
    totalAperitivos,
  };
};

module.exports = {
  getTypes,
  getVinosTypes,
  getEspumososTypes,
  getDestiladosTypes,
};
