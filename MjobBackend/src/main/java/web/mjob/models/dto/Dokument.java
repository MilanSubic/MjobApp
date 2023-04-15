package web.mjob.models.dto;

import lombok.Data;

@Data
public class Dokument {
    private Long id;
    private String naziv;
    private String dokumentTipNaziv;
    private String dokumentSadrzaj;
    private String dokumentSadrzajKontent;

}
