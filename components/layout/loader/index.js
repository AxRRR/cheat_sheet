
export const LoaderComponent = ({ children }) => {
    return (
        <section className='spinnerContent'>
            <div className='spinner'></div>
            {children}
        </section>
    )
}