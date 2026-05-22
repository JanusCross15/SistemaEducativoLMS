import {
    FaClipboardList,
    FaBook,
    FaClipboardCheck,
    FaBullhorn,
    FaMoneyBill,
    FaChartBar
} from "react-icons/fa";

function SidebarPadre() {

    return (

        <div
            style={{
                width:"250px",
                height:"100vh",
                background:"#14532d",
                color:"white",
                position:"fixed",
                padding:"30px 20px"
            }}
        >

            <h2
                style={{
                    marginBottom:"40px",
                    textAlign:"center"
                }}
            >
                PADRE
            </h2>

            <MenuItem
                icon={<FaChartBar />}
                text="Resumen"
            />

            <MenuItem
                icon={<FaClipboardList />}
                text="Solicitudes de matrícula"
            />

            <MenuItem
                icon={<FaClipboardCheck />}
                text="Asistencia"
            />

            <MenuItem
                icon={<FaBook />}
                text="Notas"
            />

            <MenuItem
                icon={<FaBullhorn />}
                text="Observaciones"
            />

            <MenuItem
                icon={<FaBullhorn />}
                text="Comunicados"
            />

            <MenuItem
                icon={<FaMoneyBill />}
                text="Pagos"
            />

        </div>
    );
}

function MenuItem({ icon, text }) {

    return (

        <div
            style={{
                padding:"15px",
                marginBottom:"10px",
                borderRadius:"10px",
                cursor:"pointer",
                display:"flex",
                gap:"10px",
                alignItems:"center",
                transition:"0.3s"
            }}
        >

            {icon}

            {text}

        </div>
    );
}

export default SidebarPadre;