const mongoose = require('mongoose');

const { Schema } = mongoose;

const laboratorySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true, enum: ['ativo', 'inativo'], default: 'ativo' },
  activeExams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
}, {
  timestamps: true,
});

const Laboratory = mongoose.model('Laboratory', laboratorySchema);
module.exports = Laboratory;
