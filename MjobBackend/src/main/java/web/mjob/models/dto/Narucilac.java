package web.mjob.models.dto;

import lombok.Data;
import web.mjob.models.entities.NaseljenoMjestoEntity;

@Data
public class Narucilac {
    private Long id;
    private String naziv;
    private String brojTelefona;
    private String email;
    private String ulicaIBroj;
    private String naseljenoMjestoByNaseljenoMjestoId;
}
