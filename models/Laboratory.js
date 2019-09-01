const mongoose = require('mongoose');

const { Schema } = mongoose;

const laboratorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['ativo', 'inativo'], default: 'ativo' },
  activeExams: [{ type: Schema.Types.ObjectId, ref: 'Exams' }],
}, {
  timestamps: true,
});

const Laboratory = mongoose.model('Laboratory', laboratorySchema);
module.exports = Laboratory;
