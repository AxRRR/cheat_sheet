import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/cjs/react.production.min"
import { httpRequest } from "../../../../helpers/httpRequest";


export const ShowSection = ({ 
    payload, 
    setElementData, 
    setSectionId 
}) => {

    const { index, _id, _elements, section_title  } = payload;

    const isEmptyData = (_id, setElementData, setSectionId) => {
        return setSectionId(_id), setElementData(null);
    }

    return (
        <Fragment>
            <li
                key={index} 
                onClick={() => {
                    _elements.length === 0 
                        ? isEmptyData(_id, setElementData, setSectionId)
                        : setSectionId(_id), setElementData(_elements);
                        }
                    }
                    ><p>{section_title}</p>
                    <div>
                        <button onClick={async() => {
                            await Promise.all([
                            httpRequest().post(`http://localhost:3000/api/section/delete/${_id}`),
                            ])
                        }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
            </li>
        </Fragment>
    )
}