const Label = require("../model/schema-label");
const boardRepository = require("./board");

const getAllLables = async () => {
  const label = await Label.find({}); //.populate({path: "owner", select: "label"});
  return label;
};

const addLabel = async (boardId, body) => {
  const label = await Label.create({ owner: boardId, ...body });
  await boardRepository.addLabel(boardId, label._id);
  return label;
};

module.exports = { getAllLables, addLabel };
