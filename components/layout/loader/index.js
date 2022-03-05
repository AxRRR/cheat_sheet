
export const LoaderComponent = ({ children }) => {
    return (
        <section className='spinnerContent'>
            <div class="spinner"></div>
            {children}
        </section>
    )
}