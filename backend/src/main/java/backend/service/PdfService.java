package backend.service;

import backend.model.Estudiante;
import backend.model.Matricula;
import backend.model.Padre;

import backend.repository.EstudianteRepository;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import backend.model.PadreEstudiante;
import backend.repository.PadreEstudianteRepository;

@Service
public class PdfService {

        @Autowired
        private EstudianteRepository estudianteRepository;

        @Autowired
        private PadreEstudianteRepository padreEstudianteRepository;

        public byte[] generarFichaMatricula(
                        Integer idEstudiante) {

                try {

                        // =========================
                        // OBTENER ESTUDIANTE
                        // =========================

                        Estudiante estudiante = estudianteRepository
                                        .findById(idEstudiante)
                                        .orElse(null);

                        if (estudiante == null) {
                                return null;
                        }

                        // =========================
                        // OBTENER MATRICULA
                        // =========================

                        Matricula matricula = estudiante.getMatricula();

                        // =========================
                        // OBTENER PADRES
                        // =========================

                        List<PadreEstudiante> relaciones = padreEstudianteRepository
                                        .findByEstudiante_IdEstudiante(
                                                        idEstudiante);

                        // =========================
                        // CREAR PDF
                        // =========================

                        Document document = new Document(
                                        PageSize.A4,
                                        30,
                                        30,
                                        20,
                                        20);

                        ByteArrayOutputStream out = new ByteArrayOutputStream();

                        PdfWriter.getInstance(document, out);

                        document.open();

                        // =========================
                        // COLORES
                        // =========================

                        BaseColor azul = new BaseColor(25, 45, 90);

                        BaseColor gris = new BaseColor(245, 245, 245);

                        BaseColor rojo = new BaseColor(180, 0, 0);

                        // =========================
                        // FUENTES
                        // =========================

                        Font titulo = FontFactory.getFont(
                                        FontFactory.HELVETICA_BOLD,
                                        22,
                                        azul);

                        Font subtitulo = FontFactory.getFont(
                                        FontFactory.HELVETICA_BOLD,
                                        14,
                                        BaseColor.BLACK);

                        Font texto = FontFactory.getFont(
                                        FontFactory.HELVETICA,
                                        11,
                                        BaseColor.BLACK);

                        Font textoBold = FontFactory.getFont(
                                        FontFactory.HELVETICA_BOLD,
                                        11,
                                        BaseColor.BLACK);

                        Font bienvenida = FontFactory.getFont(
                                        FontFactory.HELVETICA_BOLD,
                                        18,
                                        rojo);

                        // =========================
                        // LOGO
                        // =========================

                        try {

                                Image logo = Image.getInstance(
                                                "src/main/resources/static/img/LogoColegio.jpg");

                                logo.scaleToFit(90, 90);

                                logo.setAlignment(Element.ALIGN_CENTER);

                                document.add(logo);

                        } catch (Exception e) {

                                System.out.println(
                                                "No se encontró el logo");
                        }

                        // =========================
                        // NOMBRE COLEGIO
                        // =========================

                        Paragraph colegio = new Paragraph(
                                        "C.E.P. LA SAGRADA FAMILIA",
                                        titulo);

                        colegio.setAlignment(
                                        Element.ALIGN_CENTER);

                        document.add(colegio);

                        Paragraph lema = new Paragraph(
                                        "Educación - Disciplina - Trabajo",
                                        textoBold);

                        lema.setAlignment(
                                        Element.ALIGN_CENTER);

                        document.add(lema);

                        document.add(new Paragraph(" "));

                        // =========================
                        // TITULO
                        // =========================

                        PdfPTable tituloTabla = new PdfPTable(1);

                        tituloTabla.setWidthPercentage(100);

                        PdfPCell tituloCell = new PdfPCell(
                                        new Phrase(
                                                        "FICHA DE MATRÍCULA",
                                                        FontFactory.getFont(
                                                                        FontFactory.HELVETICA_BOLD,
                                                                        20,
                                                                        BaseColor.WHITE)));

                        tituloCell.setHorizontalAlignment(
                                        Element.ALIGN_CENTER);

                        tituloCell.setBackgroundColor(azul);

                        tituloCell.setPadding(10);

                        tituloTabla.addCell(tituloCell);

                        document.add(tituloTabla);

                        document.add(new Paragraph(" "));

                        // =========================
                        // DATOS MATRICULA
                        // =========================

                        PdfPTable tablaMatricula = new PdfPTable(2);

                        tablaMatricula.setWidthPercentage(100);

                        tablaMatricula.setSpacingBefore(10);

                        PdfPCell header1 = new PdfPCell(
                                        new Phrase(
                                                        "DATOS DE MATRÍCULA",
                                                        subtitulo));

                        header1.setColspan(2);

                        header1.setBackgroundColor(gris);

                        header1.setPadding(8);

                        tablaMatricula.addCell(header1);

                        if (matricula != null) {

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                "Nivel",
                                                                textoBold));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                matricula.getNivel(),
                                                                texto));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                "Grado",
                                                                textoBold));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                matricula.getGrado(),
                                                                texto));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                "Sección",
                                                                textoBold));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                matricula.getSeccion(),
                                                                texto));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                "DNI",
                                                                textoBold));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                matricula.getDni(),
                                                                texto));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                "Celular",
                                                                textoBold));

                                tablaMatricula.addCell(
                                                crearCelda(
                                                                matricula.getCelular(),
                                                                texto));
                        }

                        document.add(tablaMatricula);

                        // =========================
                        // DATOS ESTUDIANTE
                        // =========================

                        PdfPTable tablaEstudiante = new PdfPTable(2);

                        tablaEstudiante.setWidthPercentage(100);

                        tablaEstudiante.setSpacingBefore(15);

                        PdfPCell header2 = new PdfPCell(
                                        new Phrase(
                                                        "DATOS DEL ESTUDIANTE",
                                                        subtitulo));

                        header2.setColspan(2);

                        header2.setBackgroundColor(gris);

                        header2.setPadding(8);

                        tablaEstudiante.addCell(header2);

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Código",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        estudiante.getCodigoEstudiante(),
                                                        texto));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Nombres",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        estudiante.getNombres(),
                                                        texto));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Apellido Paterno",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        estudiante.getApellidoPaterno(),
                                                        texto));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Apellido Materno",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        estudiante.getApellidoMaterno(),
                                                        texto));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Sexo",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        estudiante.getSexo(),
                                                        texto));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Edad",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        String.valueOf(
                                                                        estudiante.getEdad()),
                                                        texto));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        "Dirección",
                                                        textoBold));

                        tablaEstudiante.addCell(
                                        crearCelda(
                                                        estudiante.getDireccion(),
                                                        texto));

                        document.add(tablaEstudiante);

                        // =========================
                        // DATOS PADRES
                        // =========================

                        PdfPTable tablaPadres = new PdfPTable(5);

                        tablaPadres.setWidthPercentage(100);

                        tablaPadres.setSpacingBefore(15);

                        PdfPCell header3 = new PdfPCell(
                                        new Phrase(
                                                        "DATOS DE LOS PADRES",
                                                        subtitulo));

                        header3.setColspan(5);

                        header3.setBackgroundColor(gris);

                        header3.setPadding(8);

                        tablaPadres.addCell(header3);

                        tablaPadres.addCell(
                                        crearCelda(
                                                        "Nombre Completo",
                                                        textoBold));

                        tablaPadres.addCell(
                                        crearCelda(
                                                        "DNI",
                                                        textoBold));

                        tablaPadres.addCell(
                                        crearCelda(
                                                        "Teléfono",
                                                        textoBold));

                        tablaPadres.addCell(
                                        crearCelda(
                                                        "Tipo",
                                                        textoBold));

                        tablaPadres.addCell(
                                        crearCelda(
                                                        "Dirección",
                                                        textoBold));

                        for (PadreEstudiante relacion : relaciones) {

                                Padre padre = relacion.getPadre();
                                tablaPadres.addCell(
                                                crearCelda(
                                                                padre.getNombres()
                                                                                + " "
                                                                                + padre.getApellidos(),
                                                                texto));

                                tablaPadres.addCell(
                                                crearCelda(
                                                                padre.getDni(),
                                                                texto));

                                tablaPadres.addCell(
                                                crearCelda(
                                                                padre.getTelefono(),
                                                                texto));

                                tablaPadres.addCell(
                                                crearCelda(
                                                                padre.getTipo(),
                                                                texto));

                                tablaPadres.addCell(
                                                crearCelda(
                                                                padre.getDireccion(),
                                                                texto));
                        }

                        document.add(tablaPadres);

                        // =========================
                        // MENSAJE FINAL
                        // =========================

                        document.add(new Paragraph(" "));

                        Paragraph finalTexto = new Paragraph(
                                        "¡Bienvenido a la Institución Educativa C.E.P. La Sagrada Familia!",
                                        bienvenida);

                        finalTexto.setAlignment(
                                        Element.ALIGN_CENTER);

                        document.add(finalTexto);

                        document.add(new Paragraph(" "));

                        Paragraph mensaje = new Paragraph(
                                        "Nos sentimos felices de formar parte de tu formación académica y personal.",
                                        texto);

                        mensaje.setAlignment(
                                        Element.ALIGN_CENTER);

                        document.add(mensaje);

                        document.close();

                        return out.toByteArray();

                } catch (Exception e) {

                        e.printStackTrace();

                        return null;
                }
        }

        // =========================
        // METODO CELDAS
        // =========================

        private PdfPCell crearCelda(
                        String texto,
                        Font font) {

                PdfPCell celda = new PdfPCell(
                                new Phrase(texto, font));

                celda.setPadding(8);

                return celda;
        }
}