package web.mjob.models.dto;

import jakarta.persistence.*;
import lombok.Data;
import web.mjob.models.entities.DokumentPorukaEntity;
import web.mjob.models.entities.KonverzacijaEntity;
import web.mjob.models.entities.KorisnikEntity;

import java.util.Date;
import java.util.List;

@Data
public class PorukaDto {
    private Long id;
    private String sadrzaj;
    private Long konverzacijaId;
    private Long korisnikId;
    private String korisnikKorisnickoIme;
    private String korisnikIme;
    private String korisnikPrezime;
    private Date kreirana;
    private List<DokumentPorukaDto> dokumenti;
}
