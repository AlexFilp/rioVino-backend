const Product = require("../models/product");

const getTypes = async () => {
  const totalVinos = await Product.countDocuments({
    tags: {
      $in: [
        "tinto",
        "blanco",
        "rosado",
        "generoso",
        "dulce",
        "naranja",
        "vermut",
      ],
    },
  });

  const totalEspumosos = await Product.countDocuments({
    tags: {
      $in: ["champagne", "cava", "corpinnat", "prosecco", "espumoso"],
    },
  });

  const totalDestilados = await Product.countDocuments({
    tags: {
      $in: [
        "ron",
        "ginebra",
        "whisky",
        "vodka",
        "cognac",
        "brandy",
        "pastis",
        "tequila",
        "mezcal",
        "grappa",
        "aguardiente",
        "calvado",
        "licor",
        "pacharan",
        "aperitiv",
      ],
    },
  });

  return {
    totalVinos,
    totalEspumosos,
    totalDestilados,
  };
};

const getVinosTypes = async () => {
  const totalTintos = await Product.countDocuments({ tags: "tinto" });
  const totalBlancos = await Product.countDocuments({ tags: "blanco" });
  const totalRosados = await Product.countDocuments({ tags: "rosado" });
  const totalGenerosos = await Product.countDocuments({ tags: "generoso" });
  const totalDulces = await Product.countDocuments({ tags: "dulce" });
  const totalNaranjas = await Product.countDocuments({ tags: "naranja" });
  const totalVermuts = await Product.countDocuments({ tags: "vermut" });

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
  const totalChampagnes = await Product.countDocuments({ tags: "champagne" });
  const totalCavas = await Product.countDocuments({ tags: "cava" });
  const totalCorpinnats = await Product.countDocuments({ tags: "corpinnat" });
  const totalProseccos = await Product.countDocuments({ tags: "prosecco" });
  const totalEspumosos = await Product.countDocuments({
    tags: "espumoso",
  });

  return {
    totalChampagnes,
    totalCavas,
    totalCorpinnats,
    totalProseccos,
    totalEspumosos,
  };
};

const getDestiladosTypes = async () => {
  const totalRones = await Product.countDocuments({ tags: "ron" });
  const totalGinebras = await Product.countDocuments({ tags: "ginebra" });
  const totalWhiskys = await Product.countDocuments({ tags: "whisky" });
  const totalVodkas = await Product.countDocuments({ tags: "vodka" });
  const totalCognacs = await Product.countDocuments({ tags: "cognac" });
  const totalBrandys = await Product.countDocuments({ tags: "brandy" });
  const totalPastis = await Product.countDocuments({ tags: "pastis" });

  const totalTequilas = await Product.countDocuments({
    tags: "tequila",
  });
  const totalMezcales = await Product.countDocuments({
    tags: "mezcal",
  });

  const totalGrappas = await Product.countDocuments({
    tags: "grappa",
  });
  const totalAguardientes = await Product.countDocuments({
    tags: "aguardiente",
  });

  const totalCalvados = await Product.countDocuments({ tags: "calvado" });
  const totalLicores = await Product.countDocuments({ tags: "licor" });
  const totalPacharanes = await Product.countDocuments({ tags: "pacharan" });
  const totalAperitivos = await Product.countDocuments({ tags: "aperitiv" });

  return {
    totalRones,
    totalGinebras,
    totalWhiskys,
    totalVodkas,
    totalCognacs,
    totalBrandys,
    totalPastis,
    totalTequilas,
    totalMezcales,
    totalGrappas,
    totalAguardientes,
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
