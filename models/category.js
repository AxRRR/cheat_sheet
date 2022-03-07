import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    _sections: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Section' 
    }],
});


export default mongoose.models.Category || mongoose.model('Category', CategorySchema);