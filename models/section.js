import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    section_title: {
        type: String,
    },
    _elements: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Element',
    }],
});


export default mongoose.models.Section || mongoose.model('Section', SectionSchema);
