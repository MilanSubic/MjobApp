package web.mjob.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class Dokument {
    public String naziv;
    public Long velicina;
    public String dokumentTipNaziv;
    public List<DokumentSadrzaj> dokumentSadrzajsById;
}
