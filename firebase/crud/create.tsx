import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config';

const notesRef = collection(db, 'notes');
const categoriesRef = collection(db, 'categories');
const javascriptRef = collection(db, 'notes_collection');

export const addNewNote = async() => {
    await addDoc(javascriptRef, {
        // category: 'categories/1H8xC71meg81PXs13fpM',
        id: 2,
        title: 'Next.js',
    });
}

const categoryModel = {
    id: Number,
    category: String,
    elements: [
        {
            section_title: String,
            children: [
                {
                    titie: String,
                    code: String
                }
            ]
        }
    ]
};


export const addNewCategory = async() => {
    await addDoc(javascriptRef, {
        id: 2,
        category: 'React',
        elements: [
            {
                section_title: 'Funciones React',
                children: [
                    {
                        title: 'Funciones',
                        code: 'if(2 === 2) \
                            return true;'
                    },
                    {
                        title: 'Arrow Functions',
                        code: 'if(2 === 3) \
                            return true;'
                    }
                ],
            },
            {
                section_title: 'Funciones React',
                children: [
                    {
                        title: 'Funciones',
                        code: 'if(2 === 2) \
                            return true;'
                    },
                    {
                        title: 'Arrow Functions',
                        code: 'if(2 === 3) \
                            return true;'
                    }
                ],
            },
        ]
            
    });
}

export const getAllElements = async() => {
    const querySnapshot = await getDocs(javascriptRef);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}


export const getDataByCategory = async() => {
    let array: DocumentData[] = [];

    const queryFilter = await 
        getDocs(query(collection(db, 'notes_collection'), where('category', '==', 'React')))
    queryFilter.forEach((doc) => {
        return  array.push(doc.data());
    });

    return array;
}

// actualización de la versión 8.

// import { collection, query, where, getDocs } from "firebase/firestore";

// const q = query(collection(db, "cities"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });