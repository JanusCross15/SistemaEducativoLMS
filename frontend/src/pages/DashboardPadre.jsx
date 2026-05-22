import SidebarPadre from "../components/SidebarPadre";

function DashboardPadre() {

    return (

        <div
            style={{
                display:"flex",
                background:"#f5f5f5",
                minHeight:"100vh"
            }}
        >

            <SidebarPadre />

            <div
                style={{
                    flex:1,
                    padding:"40px",
                    marginLeft:"260px"
                }}
            >

                <h1
                    style={{
                        color:"#14532d",
                        fontWeight:"bold"
                    }}
                >
                    Bienvenido Padre de Familia
                </h1>

                <p>
                    Panel de gestión académica
                </p>

            </div>

        </div>
    );
}

export default DashboardPadre;