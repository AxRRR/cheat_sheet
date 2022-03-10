
export const Footer = () => {
    return(
        <footer className='footer'>
            <main>
                <section>
                    <h1>Cheat Sheet</h1>
                </section>
                <section>
                    <p>Inicio</p>
                    <p>Crea un perfil</p>
                    <p>Gestor de Proyectos</p>
                </section>
                <section>
                    <a href='https://github.com/AxRRR/cheat_sheet' target='_blank'>
                        <p>Repositorio</p>
                    </a>
                    {/* <p>GitHub Fabrizio Luna</p> */}
                    <a href='http://fabrizioluna.com.mx' target='_blank'>
                        <p>FabrizioLuna.com.mx</p>
                    </a>
                    <p>Derechos reservados Fabrizio Luna 2022</p>
                </section>
            </main>
        </footer>
    )
}