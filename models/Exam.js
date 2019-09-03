const mongoose = require('mongoose');

const { Schema } = mongoose;

const examSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['analise clinica', 'imagem'] },
  status: { type: String, required: true, enum: ['ativo', 'inativo'], default: 'ativo' },
}, {
  timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
