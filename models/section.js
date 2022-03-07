import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    section_title: {
        type: String
    },
    section_date: {
        type: Date
    },
    _elements: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Element',
    }],
});


export default mongoose.models.Section || mongoose.model('Section', SectionSchema);
