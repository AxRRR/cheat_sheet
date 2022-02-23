import { Fragment } from "react"
import { Childrens } from "../children/children"

export const Element = ({ elements, parentIndex }) => {

    return(
        <Fragment>
            {
                elements
                    .map(({ 
                        children, 
                        section_title 
                    }, elementIndex) => 
                    <div key={elementIndex}>
                        <h2>
                            {section_title}
                        </h2>
                        {
                            children
                                .map(({ 
                                    code, 
                                    title 
                                }, index) =>
                        <Childrens 
                            code={code}
                            title={title}
                            childrenIndex={index}
                            elementIndex={elementIndex}
                            parentIndex={parentIndex}
                        />
                    )}
                    </div>
                )
            }
        </Fragment>
    )
}