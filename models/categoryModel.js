import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
    }
});


export default mongoose.models.Category || mongoose.model('Category', CategorySchema);