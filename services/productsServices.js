const Product = require("../models/product");

const getTypes = async () => {
  const totalVinos = await Product.countDocuments({ type: "vinos" });
  const totalEspumosos = await Product.countDocuments({ type: "espumosos" });
  const totalDestilados = await Product.countDocuments({
    type: "destilados",
  });

  return { totalVinos, totalEspumosos, totalDestilados };
};

const getVinosTypes = async () => {
  const totalTinto = await Product.countDocuments({ subType: "tinto" });
  const totalBlanco = await Product.countDocuments({ subType: "blanco" });
  const totalRosado = await Product.countDocuments({ subType: "rosado" });
  const totalGeneroso = await Product.countDocuments({
    subType: "generoso",
  });
  const totalDulce = await Product.countDocuments({ subType: "dulce" });
  const totalNaranja = await Product.countDocuments({ subType: "naranja" });
  const totalVermut = await Product.countDocuments({ subType: "vermut" });

  return {
    totalTinto,
    totalBlanco,
    totalRosado,
    totalGeneroso,
    totalDulce,
    totalNaranja,
    totalVermut,
  };
};

const getEspumososTypes = async () => {
  const totalChampagne = await Product.countDocuments({
    subType: "champagne",
  });
  const totalCava = await Product.countDocuments({ subType: "cava" });
  const totalCorpinnat = await Product.countDocuments({
    subType: "corpinnat",
  });
  const totalProsecco = await Product.countDocuments({ subType: "prosecco" });
  const totalOtrosEspumosos = await Product.countDocuments({
    subType: "otrosEspumosos",
  });

  return {
    totalChampagne,
    totalCava,
    totalCorpinnat,
    totalProsecco,
    totalOtrosEspumosos,
  };
};

const getDestiladosTypes = async () => {
  const totalRon = await Product.countDocuments({ subType: "ron" });
  const totalGinebra = await Product.countDocuments({ subType: "ginebra" });
  const totalWhisky = await Product.countDocuments({ subType: "whisky" });
  const totalVodka = await Product.countDocuments({ subType: "vodka" });
  const totalCognac = await Product.countDocuments({ subType: "cognac" });
  const totalBrandy = await Product.countDocuments({ subType: "brandy" });
  const totalPastis = await Product.countDocuments({ subType: "pastis" });
  const totalTequilaYMezcal = await Product.countDocuments({
    subType: "tequilaYMezcal",
  });
  const totalGrappaYAguardiente = await Product.countDocuments({
    subType: "grappaYAguardiente",
  });
  const totalCalvados = await Product.countDocuments({ subType: "calvados" });
  const totalLicores = await Product.countDocuments({ subType: "licores" });
  const totalPacharan = await Product.countDocuments({ subType: "pacharan" });
  const totalAperitivos = await Product.countDocuments({
    subType: "aperitivos",
  });

  return {
    totalRon,
    totalGinebra,
    totalWhisky,
    totalVodka,
    totalCognac,
    totalBrandy,
    totalPastis,
    totalTequilaYMezcal,
    totalGrappaYAguardiente,
    totalCalvados,
    totalLicores,
    totalPacharan,
    totalAperitivos,
  };
};

module.exports = {
  getTypes,
  getVinosTypes,
  getEspumososTypes,
  getDestiladosTypes,
};
